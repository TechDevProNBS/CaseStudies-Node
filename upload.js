const IncomingForm = require('formidable').IncomingForm
var fs = require('file-system');

module.exports = function upload(req, res) {
  var form = new IncomingForm()

  form.on('file', (field, file) => {
      var filetype = "";
      var filename = "";
      console.log("here")
      console.log(file.type)
      console.log(file.name)
      console.log(file.size)
      console.log(file.path)
      //console.log(fs.stats(file.path))
    //   if(file.type == "image/jpeg"){
    //       console.log(".jpg")
    //       filetype = ".jpg";
    //   }
    //   if(file.type == "image/png"){
    //     console.log(".png")
    //     filetype = ".png";
    //     }
    //filename = file.name
      console.log(`C:/Users/QA/Desktop/group project/photos/${file.name}`)
      fs.copyFile(file.path, `C:/Users/QA/Desktop/group project actual/casestudies0.1/src/website photos/${file.name}`, (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
      });
      console.log("here")
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
  })
  form.on('end', () => {
      //console.log(res.json())
    res.json()
  })
  form.parse(req)
}