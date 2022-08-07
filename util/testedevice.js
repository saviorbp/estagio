export async function testeDevice(form) {
  var value = true;

  form.devices.forEach((device) => {
    if (device.type == undefined || device.condition == undefined)
      value = false;
    else value = true;
  });
  {console.log(value)}
  return { value };
}