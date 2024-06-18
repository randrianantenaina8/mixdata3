import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box } from "@mui/material";

class SimpleInputFile extends Component {
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
      <Box className="styledSimpleDropBox">
        <DropzoneArea
          onChange={this.handleChange.bind(this)}
          dropzoneText="Png,Jpeg (max. 3MB)"
          Icon={UploadFileIcon}
          maxFileSize={3000000}
          acceptedFiles={[
            "image/jpeg",
            "image/png"
          ]}
          filesLimit={1}
        />
      </Box>
    );
  }
}

export default SimpleInputFile;
