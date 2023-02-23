//return index from T1 payload
function decode_index(payload) {
  var index = null;
  if (payload.length == 40) {
      index = payload.substring(2, 8);
  }
  return parseInt(index, 16);
}

//return hexadecimal power list from T1 payload
function payload_to_hex(payload) {
  var list_increment_hex = []
  if (payload.length == 40){
      for(i=0;i<16;i++){
          list_increment_hex.push(payload.substring((8+2*i),2+(8+2*i)))
      }
  }
  return list_increment_hex
}

//return power list from T1 payload
function decode_list_increment(payload) {
  var list_increment = []
  var list_increment_hex = []
  if (payload.length == 40){
      list_increment_hex = payload_to_hex(payload)
  }
  if(list_increment_hex.length == 16){
      for(i=0;i<8;i++){
          list_increment.push(parseInt(list_increment_hex[i*2]+list_increment_hex[i*2+1], 16))
      }
  }    
  return list_increment
}

//return step from T1 payload
function decode_step(payload){
  var step = 0
  var header = null
  if(payload.length == 40){
      header = parseInt(payload.substring(0, 2), 16)
      if(header == 29) step = 10
      if(header == 30) step = 15
      if(header == 31) step = 60
  }
  return step
}