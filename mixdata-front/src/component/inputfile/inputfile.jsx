import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box } from "@mui/material";

class InputFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  handleChange(files) {
    this.setState({
      files: files,
    });

    this.props.handleUpload(files);
  }
  render() {
    return (
      <Box className="styledDropBox">
        <DropzoneArea
          onChange={this.handleChange.bind(this)}
          dropzoneText="uploader un ou plusieurs documents"
          Icon={UploadFileIcon}
          maxFileSize={3000000}
          acceptedFiles={[
            "image/jpeg",
            "image/png",
            "image/bmp",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/pdf",
          ]}
        />
      </Box>
    );
  }
}

export default InputFile;
