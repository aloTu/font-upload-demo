import React, { useState } from "react";
import { Upload, message, List, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FontName from "fontname";

const FontUploader = () => {
  const [fontFile, setFontFile] = useState<string | null>(null);

  const [fontList, setFontList] = useState<{ name: string; url: string }[]>([]);

  const handleUpload = (info: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const fontMeta = FontName.parse(e.target?.result)[0];
        console.log(fontMeta.fontFamily);
        const newFont = {
          name: fontMeta.fontFamily,
          url: URL.createObjectURL(info.file),
        };
        setFontList([...fontList, newFont]);
      } catch (e) {
        // FontName may throw an Error
      }
    };
    reader.readAsArrayBuffer(info.file);
    // setFontFile(URL.createObjectURL(info.file));
    message.success(`${info.file.name} file uploaded successfully.`);
  };

  return (
    <div>
      <Upload
        accept=".ttf,.otf"
        beforeUpload={() => false}
        onChange={handleUpload}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>

      {fontList.map((font) => {
        return (
          <div key={font.name}>
            <style>
              {`
            @font-face {
              font-family: '${font.name}';
              src: url('${font.url}') format('truetype');
            }
          `}
            </style>
            <p style={{ fontFamily: font.name }}>{font.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FontUploader;
