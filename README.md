# Device Repository for The Things Stack

The device repository contains the profiles of LoRaWAN devices, allowing users to seamlessly configure the devices to their applications. Users only select the device in the Console or CLI to load all the technical configuration settings such as the supported frequency plan, MAC and PHY version, payload formats etc.

## File Format

The Device Repo is a collection of YAML files, structured in the following folders:

- Vendors
- Device-models
- Payload-formatters
- Firmwares (optional)

## Contributing
Thank you for your interest in building this thing together. Please use the templates as a reference for completing the YAML files in the right format. Once the templates have been filled out, please submit a PR to add the content to the Device Repository.

### Example

**Vendor file**

```yml
vendor-id: thethingsindustries              # Define id, lowercase without spaces
vendor-name: "The Things Industries"        # Company name, use double quotes " "
description: "Building end-to-end secured LoRaWAN networks with 99,9%+ availability"   # Short description of the company.

devices:                                    # List all devices with the exact name of the file
  - id: The Things Node
    file: thethingsnode.yml
  - id: The Things Uno
    file: thethingsuno.yml

images:
  logo: thethingsindustries.png             # Min-width: 600px, max-width: 800px, white or transparent background
  logo-svg: thethingsindustries.svg         # svg file
  logo-thumbnail: thethingsindustries-thumbnail.png    # 300x300px, white or transparent background

external-links:                             # Add any relevant link
  website: https://www.thethingsindustries.com/
  shop: https://www.thethingsnetwork.org/the-things-products
```

**Device Model file**

```yml
# Generic info
generic-info:
  vendor-name: "The Things Industries"      # Use double quotes
    file: the-things-industries.yml
  model-id:                                 # Unique ID, set by device maker
  model-name: "The Things Node"             # Product name
  description: "The perfect LoRaWAN node to start prototyping your ideas without having to deal with bread boards, wires and sensors."      # Short description of the device (max 25 words). Use Double quotes.
  external-links:                           # Add any relevant link
    documentation: https://www.thethingsnetwork.org/docs/devices/node/
    website: https://thethingsindustries.com/
  resellers:
    - name: "Element14"                     # Use double quotes
      website: http://uk.farnell.com/the-things-network/ttn-nd-868/the-things-node-eu/dp/2675817
      region: Europe
    - name: "RS Coponents"                  # Use double quotes
      website: https://uk.rs-online.com/web/p/sensor-development-kits/1359784/
      region: Europe
    - name: "Newark"                        # Use double quotes
      website: http://www.newark.com/the-things-network/ttn-nd-915/accessory-type-sensor-node-development/dp/05AC1809
      region: USA

# Generic settings - define for each hardware versions
settings:
  - hardware-id:                              # Hardware id. leave blank if there is only 1 hardware version
    mac-version: 1.0.3                        # LoRaWAN version supported by the End Device. Options: 1.0/1.0.1/1.0.2/1.0.3/1.0.4/1.1
    phy-version: 1.0.3                        # Regional Parameters version supported by the End Device. Options: 1.0/1.0.1/1.0.2-rev-A/1.0.2-Rev-B/1.0.3/1.0.4/1.1-rev-A/1.1-rev-B
    supports-device-mode:                     # Options: class-a/class-b/class-c
      - class-a
      - class-b
    supports-join: yes                        # End-Device supports Join. yes = OTAA, no = only ABP
    supports32bit-fcnt: no                   # End-Device uses 32bit frame count (mandatory for LoRaWAN 1.1)
    sensors-and-peripherals:                  # List all sensors and peripherals
      - temperature
      - humidity
      - acceleration
      - light
      - button
      - led
    additional-radios:
    configuration:
      - manual                                # Manually enter EUIs and keys
    battery-type: replaceable                 # Options: embedded/rechargeable/replaceable
    ip-rating: IP54
    dimensions:                               # dimensions in cm
      width: 6
      length: 12
      height: 4
    weight: 80                                # weight in grams
    images:                                   # Images - save the files in the same folder. Add the exact names below.
      image: TheThingsNode.png                # Min-width: 600px, max-width: 800px, white or transparent background
      image-thumbnail: TheThingsNode-thumbnail.png                    # 300x300px, white or transparent background
      image2:                                 # Add imagex line for each new image

# Device Profiles per frequency band
device-profiles:
  - id: EU_863_870                            # Write name of the band. Select: EU-863-870/IN-865-867/RU-864-870/US-902-928/AU-915-928/AS-920-923/AS-923-925/KR-920-923/CN-470-510/LoRa-2.4
    certifications:
      - authority: ce
        link-to-report: https://lora-alliance.org/sites/default/files/showcase-documents/Testreport_LoRa%20Certifcation_Sagemcom.pdf
    configurations:
      max-eirp: 0                             # Maximum EIRP (Equivalent Isotropically Radiated Power). See Regional Parameters for reference. Default: 0
      max-duty-cycle: 0.01                    # Maximum duty cycle supported by the End-Device. Example: 0.01 indicates 1%
      rx-delay1: 1000                         # in milliseconds. Example: 1000. Manadory fields if ABP is supported. See Regional Parameters for reference.
      rx-dr-offset1:                          # RX1 data rate offset. Example: 5. Manadory fields if ABP is supported.
      rx-dr: 3                                # RX2 data rate. Example: 3. Manadory fields if ABP is supported.
      rx2-freq: 869525000                     # RX2 channel frequency in Hz. Example: 869525000. Manadory fields if ABP is supported.
      factory-preset-freqs:                   # List of factory-preset uplink frequencies. Example: 868100000, 868300000, 868500000, 867100000, 867300000, 867500000, 867700000, 867900000
        - 868100000
        - 868300000
        - 868500000
        - 867100000
        - 867300000
        - 867500000
        - 867700000
        - 867900000
    class-b-settings:                         # Manadory fields if Class B is supported
      class-b-timeout:                        # Maximum delay in milliseconds for the End-Device to answer a MAC request or a confirmed DL frame
      pingslot-period:                        # In milliseconds
      pingslot-dr:                            # See Regional Parameters for reference. Example: 3
      pingslot-freq:                          # In Hz. Example: 869525000
    class-c-settings:                         # Manadory fields if Class C is supported:
      class-c-timeout:                        # Maximum delay in milliseconds for the End-Device to answer a MAC request or a confirmed DL frame

  - id: US_902_928                            # Add new settings-band-x for each supported band
    certifications:
      - authority: fcc
        link-to-report:
    configurations:
      max-eirp: 0                             # Maximum EIRP (Equivalent Isotropically Radiated Power). See Regional Parameters for reference. Default: 0
      max-duty-cycle:                         # Maximum duty cycle supported by the End-Device. Example: 0.01 indicates 1%
      rx-delay1: 1000                         # In milliseconds. Example: 1000.  Manadory fields if ABP is supported.
      rx-dr-offset1:                          # RX1 data rate offset. Example: 5.  Manadory fields if ABP is supported.
      rx-dr:                                  # RX2 data rate. Example: 3.  Manadory fields if ABP is supported.
      rx2-freq:                               # RX2 channel frequency in Hz. Example: 869525000.  Manadory fields if ABP is supported.
      factory-preset-freqs:                   # List of factory-preset uplink frequencies. Example: 868100000, 868300000, 868500000, 867100000, 867300000, 867500000, 867700000, 867900000
        - 903900000
        - 904100000
        - 904300000
        - 904500000
        - 904700000
        - 904900000
        - 905100000
        - 905300000
    class-b-settings:                         # Manadory fields if Class B is supported
      class-b-timeout:                        # Maximum delay in milliseconds for the End-Device to answer a MAC request or a confirmed DL frame
      pingslot-period:                        # In milliseconds
      pingslot-dr:                            # See Regional Parameters for reference. Example: 3
      pingslot-freq:                          # In Hz. Example: 869525000
    class-c-settings:                         # Manadory fields if Class C is supported:
      class-c-timeout:                        # Maximum delay in milliseconds for the End-Device to answer a MAC request or a confirmed DL frame

# Software versions, referring compatible hardware versions
firmware-version:
  - firmware-id:                              # leave blank if there is only 1 firmware version
    payload-formatter-up: thethingsnode-payload-up.js  # Exact name of the file as saved in the same folder.
    payload-formatter-down:                   # leave blank if not applicable
    firmware-file:                            # Optional. Add link to firmware source code
```
