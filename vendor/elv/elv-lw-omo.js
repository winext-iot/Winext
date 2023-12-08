/*
* ELV-LW-OMO Payload Parser
*
* Version: V1.0.1
*
* */

function decodeUplink(input) {
  var data = input.bytes;
  var valid = true;

  if (typeof Decoder === "function") {
    data = Decoder(data, input.fPort);
  }

  if (typeof Converter === "function") {
    data = Converter(data, input.fPort);
  }

  if (typeof Validator === "function") {
    valid = Validator(data, input.fPort);
  }

  if (valid) {
    return {
      data: data
    };
  } else {
    return {
      data: {},
      errors: ["Invalid data received"]
    };
  }
}

var tx_reason = ["Undefined","Button Pressed", "Heartbeat", "Settings", "Joined", "Acceleration", "Tilt", "Ongoing Acceleration", "Inactivity", "Error"];
var frame_type = ["Device_Info", "Device_State", "Acceleration_Data", "Button_Pressed", "Config_Data"];
var device_modes = ["Acceleration", "Tilt"];
/*
 * @brief   Receives the bytes transmitted from a device of the ELV-LW-OMO
 * @param   bytes:  Array with the data stream
 * @param   port:   Used TTN/TTS data port
 * @return  Decoded data from a device of the ELV-LW-OMO
 * */
function Decoder(bytes, port) {
  var decoded = {};   // Container with the decoded output
  var Temp_Value = 0; // Variable for temporarily calculated values

  if (port === 10) {  // The default port for app data
       // Minimum 5 Bytes for Header

      // Collecting header data

      decoded.Supply_Voltage = bytes[0] * 10;
      decoded.frame_type = frame_type[(bytes[1])]; //Frametype encodes what Kind of Payload is being sent
      decoded.TX_Reason = tx_reason[(bytes[2])];
      //Write every reason for sending correspondig to bit n
      switch (decoded.frame_type)
      {
        case "Device_Info":
          var bl_version_major = bytes[3];
          var bl_version_minor = bytes[4];
          var bl_version_patch = bytes[5];

          decoded.Bootloader_Version = `${bl_version_major}.${bl_version_minor}.${bl_version_patch}`; //Build version-String from 3 previous values

          var fw_version_major = bytes[6];
          var fw_version_minor = bytes[7];
          var fw_version_patch = bytes[8];

          decoded.Firmware_Version = `${fw_version_major}.${fw_version_minor}.${fw_version_patch}`;//Build version-String from 3 previous values

          decoded.hw_revision = bytes[9] << 8 | bytes[10]; // //HW version is encoded as 16-Bit int
          break;
        case "Device_State":
          decoded.Accelerated = !!(bytes[3] & 0x1);
          decoded.Tilt_Area_0 = !!(bytes[3] & 0x10);
          decoded.Tilt_Area_1 = !!(bytes[3] & 0x20);
          decoded.Tilt_Area_2 = !!(bytes[3] & 0x40);

          decoded.Angle = bytes[4];

          decoded.Activation_count = (bytes[5] << 8 | bytes[6]);
          break;
        case "Acceleration_Data":
          decoded.Accelerated = !!(bytes[3] & 0x1);
          decoded.Tilt_Area_0 = !!(bytes[3] & 0x10);
          decoded.Tilt_Area_1 = !!(bytes[3] & 0x20);
          decoded.Tilt_Area_2 = !!(bytes[3] & 0x40);

          decoded.Angle = bytes[4];
          break;
        case "Button_Pressed":
          decoded.Button_Count = bytes[3];
          break;
        case "Config_Data":
          decoded.device_mode = "";
          for(let i = 0; i < 8; i++)
          {
            if((bytes[3] >> i) & 1)
            {
              decoded.device_mode += device_modes[i];
            }
          }

            decoded.sensor_threshold = bytes[4];

            decoded.range = bytes[5];
            decoded.alpha = bytes[6];

            decoded.beta = bytes[7];

            decoded.hysteresis = bytes[8];

            decoded.senc_cycle_minutes = bytes[9] * 6;
            break;
      }

  }
  else {
    decoded.parser_error = "Wrong Port Number";
  }

  return decoded;
}