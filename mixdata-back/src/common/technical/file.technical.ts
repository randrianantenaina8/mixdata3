const fs = require('fs');

export const readJsonFile = async (filepath: string) => {
    let  data = null;
   try {
      data = fs.readFileSync(filepath);
      data = JSON.parse(data);
   } catch (error) {
      console.error(error);
      throw error;
   }
   return data;
}

export const createJsonFile = async (filepath: string, data: Object) => {
  try {
   fs.writeFile(filepath, JSON.stringify(data), 'utf8', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  } catch (error) {
     console.error(error);
     throw error;
  }
  return data;
}

export const fileExist = (path: string) => {
   try {
      console.log('fs.existsSync(path)', fs.existsSync(path));
      return fs.existsSync(path);
    } catch(err) {
      console.log('fs error', fs.existsSync(path));
      console.error(err)
      return false;
    }
}