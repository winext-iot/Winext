function decodeUplink(input) {

  let data = Bytes2HexString(input.bytes);
  let decoded = {};
  if(input.bytes[0] == 241){
    decoded.type = input.bytes[0];
    if(input.bytes[6] & 0x80){
      decoded.longitude = (parseInt(data.substr(12,8),16) - parseInt('100000000',16))/1000000;
    }else{
      decoded.longitude = parseInt(data.substr(12,8),16)/1000000;
    }
    if(input.bytes[10] & 0x80){
      decoded.latitude = (parseInt(data.substr(20,8),16) - parseInt('100000000',16))/1000000;
    }else{
      decoded.latitude = parseInt(data.substr(20,8),16)/1000000;
    }
    decoded.paws = parseInt(data.substr(32,8),16);
    let timePower =parseInt(data.substr(40,4),16).toString(2);
    decoded.battery = parseInt(timePower.substring(timePower.length-5),2)
    decoded.working = parseInt(data.substr(44,4),16);
  }else if(input.bytes[0] == 240){
    decoded.type = input.bytes[0];
    decoded.paws = parseInt(data.substr(12,8),16);
    let timePower =parseInt(data.substr(20,4),16).toString(2);
    decoded.battery = parseInt(timePower.substring(timePower.length-5),2)
    decoded.working = parseInt(data.substr(24,4),16);
  }else if(input.bytes[0] == 242){
    decoded.type = input.bytes[0];
    decoded.paws = parseInt(data.substr(70,8),16);
    let timePower =parseInt(data.substr(78,4),16).toString(2);
    decoded.battery = parseInt(timePower.substring(timePower.length-5),2)
    decoded.working = parseInt(data.substr(82,4),16);
  }

  return {
    data: {
      bytes: decoded
    },
    warnings: [],
    errors: []
  };
}

function Bytes2HexString(arrBytes) {
  var str = "";
  for (var i = 0; i < arrBytes.length; i++) {
    var tmp;
    var num=arrBytes[i];
    if (num < 0) {
      tmp =(255+num+1).toString(16);
    } else {
      tmp = num.toString(16);
    }
    if (tmp.length == 1) {
      tmp = "0" + tmp;
    }
    str += tmp;
  }
  return str;
}
