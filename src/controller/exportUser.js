

const fs = require('fs');
const path = require('path');
const User = require('../models/register');
const CsvParser = require('json2csv').Parser;

const exportUser = async (req, res) => {
  try {
    let users = [];
    const userData = await User.find({});
    userData.forEach((user) => {
      const { id, username, email, phone, password } = user;
      users.push({ id, username, email, phone, password });
    });

    // creating csv
    const csvFields = ['ID', 'Name', 'Email', 'Phone', 'Password'];

    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(users);

    // set file path where the CSV data will be saved
    const filePath = path.join(__dirname, './userData.csv');

    // create a writable stream to the file
    const writeStream = fs.createWriteStream(filePath, { flags: 'w' });

    // write the CSV data to the stream
    writeStream.write(csvData);

    // end the stream to save the file
    writeStream.end(() => {
      // set the response headers and send the file to the client
      res.setHeader('content-Type', 'text/csv');
      res.setHeader(
        'content-Disposition',
        'attachment: filename=userData.csv'
      );
      res.status(200).sendFile(filePath);
    });
  } catch (error) {
    res.send({ staus: 400, success: false, msg: error.message });
  }
};

module.exports = { exportUser };
