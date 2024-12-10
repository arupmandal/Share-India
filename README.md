
# Share💖India - File Sharing App


Share💖India is a file-sharing application that allows users to upload files up to 1GB, generate a unique token for each file, and share it with others. The links generated for the uploaded files expire after 24 hours. Users can also download files using the generated token.




![Logo](https://raw.githubusercontent.com/arupmandal/Indian-Post-API/main/IMG/Blue%20and%20Gray%20Illustration%20Personal%20LinkedIn%20Banner.png)


## Features

- Upload files up to 1GB.
- Generate a unique token for each uploaded file.
- Shareable link for the uploaded file.
- File links expire after 24 hours.
- Download files using the generated token.
- Support for all file types.
- Easy-to-use API for file upload and download.



## Installation
Follow these steps to install and run Share💖India locally:


```
git clone https://github.com/arupmandal/share-love-india.git

```
```
cd share-love-india
```
```
npm install

```
```
node server.js
```
```Configure Cloudinary:```
Make sure you have a Cloudinary account and replace the ```cloud_name,``` ```api_key```, and ```api_secret``` in ```cloudinary.js``` with your own credentials.
## API Endpoints

#### POST /api/files/upload
Description: Uploads a file and generates a unique token

Request Body:
file: The file to upload (use multipart/form-data).

```http
  {
  "message": "File uploaded successfully!",
  "token": "ShareIndia-AB12",
  "expiry": "1684387840000",
  "fileName": "example.jpg",
  "fileSize": 1234567,
  "fileUrl": "https://res.cloudinary.com/dowjryqfx/image/upload/v1684387840/example.jpg"
}

```
## Authors

- [@Arup Mandal](https://www.github.com/arupmandal)

