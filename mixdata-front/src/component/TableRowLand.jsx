import { Badge } from "@mui/material";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import enqueteIcon from '../assets/svg/ListParcelle/enqtIcon.svg'
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../hooks/UseApplication';
import { useState } from "react";

function TableRowLand(props) {
  const { row, keyIndex } = props;
  const navigate = useNavigate()
  const { setDetails } = useApplication()
  const [isStarHovered, setIsStarHovered] = useState(false);

  
  /*****custom styles variables*/
  const brown = '#363636'

  const starHoverColor = {
    "&:hover": {
      fill : "yellow"
    }
  }
  const handleStarHover = () => {
    setIsStarHovered(true);
  }
  
  const handleStarLeave = () => {
    setIsStarHovered(false);
  }

  return (
    <>
      <tr sx={{ '& > *': { borderBottom: 'none' } , '&:hover': {backgroundColor: 'lightblue'} }} key={keyIndex} style={{cursor: 'pointer'}} onClick={() => { setDetails(row._source) ; navigate(`/details/${row._source.id}`)}}>
        <td align='left' >
          <div class='d-flex  justify-content-center'>
          <div class='mx-2' onMouseEnter={handleStarHover} onMouseLeave={handleStarLeave}>
            {isStarHovered ? <StarIcon style={{ color: 'brown' }} /> : <StarBorderOutlinedIcon style={{ color: 'black' }} />}
          </div>
          </div>
        </td>
        <td style={{ paddingLeft: '15px' }}>{row._source.code_number}</td>
        <td style={{ paddingLeft: '15px' }} align="left">{row._source.area} m<sup>2</sup></td>
        <td>
          {(row._source.address_full && row._source.address_full.length > 30) ? `${row._source.address_full.substring(0, 30)}...` : row._source.address_full}
        </td>
        <td style={{ paddingLeft: '25px' }} align="left">{row._source.principal_type}</td>
        <td style={{ paddingLeft: '25px' }} align="left">{row._source.bare_land === true ? 'oui' : 'non'}</td>
        <td style={{ paddingLeft: '25px' }} align="left">{row._source.public_property === true ? 'oui' : 'non'}</td>
        <td style={{ paddingLeft: '25px' }} align="left">{row._source.type || 'inconnu'}</td>
        <td style={{ paddingLeft: '25px' }} align="left">{row._source.building_nb || "0"}/{row._source.average_building_year || "Date inconnue"}</td>
        <td style={{ paddingLeft: '15px' }}>
          <div class='d-flex  justify-content-center'>
            <div class='mx-2'>
              <Badge badgeContent={row._source.transactions ? (row._source.transactions).length : '0'} color="primary" size="small"   anchorOrigin={{  vertical: 'bottom', horizontal: 'right', }}>
                < MonetizationOnOutlinedIcon style={{ color: brown }} />
              </Badge>
            </div>
            <div>
              <Badge badgeContent={row._source.building_permit_number ? row._source.building_permit_number : '0'}  color="primary" size="small"   anchorOrigin={{  vertical: 'bottom', horizontal: 'right', }}>
                <Image class='fluid' style={{ color: brown, fill: brown }} src={enqueteIcon} />
              </Badge>
            </div>
            {/* <div class='mx-2'>
              <Badge badgeContent={1} color="primary" size="small"   anchorOrigin={{  vertical: 'bottom', horizontal: 'right', }}>
                <Image class="fluidssNa" style={{ color: brown, fill: brown }} src={noteIcon} />
              </Badge>
            </div> */}
          </div>
        </td>
      </tr>
    </>
  );
}

export default TableRowLand;
