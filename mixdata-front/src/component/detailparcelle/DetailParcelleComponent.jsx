import React, {useEffect , useRef , useState} from "react";
import { useApplication } from "../../hooks/UseApplication";

// import Table from '@mui/material/Table';
import { Box, Typography , Chip , Badge} from "@mui/material"

/**** Svgs */
import Enquete from '../../assets/Images/icons/enQt.svg'
import Transaction from '../../assets/Images/icons/Transaction.svg'
import Gestion from '../../assets/Images/icons/gestion.svg'


/*****Ui icons */
import StarBorderIcon from '@mui/icons-material/StarBorder';

/*****import some utilities components */
import { Link } from "react-router-dom";

/****import styles */
import { detailparcelleStyles } from "./components/styles";

/*****import components */
import DetailMap from "./components/detailmaps";
import EnqueteDetail from "./components/enquete";
import TransactionDetail from "./components/transaction";
import DetailInfos from "./components/infos";

const DetailParcelle = ({detailMapData , detailTransaction , detailEnquete}) => {
  const [detailParcelle , setDetailParcelle] = useState({})
  // const params = useParams()
  const { details } = useApplication()
  const innerHeadRef = useRef(null);
  // const location = useLocation()

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const grandParentWidth = entry.target.clientWidth;
        innerHeadRef.current.style.width = grandParentWidth + 'px';
      }
    });

    if(details){
      setDetailParcelle(details)
    }
    resizeObserver.observe(innerHeadRef.current.parentElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [details , detailMapData , detailTransaction , detailEnquete]);
  
  function scrollToElement(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth" // Défilement en douceur
      });
    }
  }

  /**** styles constantes */
  const responsiveFloatingParcels = {
    top: "8.8%",
    '@media(max-width: 768px)' : {
      top: "15.8%"
    }
  }

  return (
    <>
      <Box className="Layout bg-white mt-4 rounded">
        <Box className="container-fluid">
          <Box className="row">
            <Box className="col-12 d-flex justify-content-between align-items-center innerHead" sx={{ background: "#fff" , position: "fixed", padding:"15px" , zIndex: 9999, filter: "drop-shadow(0px 4px 4px rgba(230, 230, 230, 0.25))" , flexWrap: "wrap" , ...responsiveFloatingParcels}} ref={innerHeadRef}>
              <Box>
                <Box sx={{display: "flex" , alignItems: "center"}}>
                  <Typography variant="h4" className="" sx={{...detailparcelleStyles.fontWeightTitle , mr:1 , fontSize: "1.625rem"}}>Parcelle n°{detailParcelle.code_number}</Typography>
                  <Chip icon={<StarBorderIcon sx={{fill: "#fff", height: "17px"}} />} label="Favoris"  sx={{cursor: "pointer" , background: "#363636", color: "#fff" , p: "5px", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);" , fontSize: "9px" , height: "26px"}} />
                </Box>
                  <Box sx={{marginBottom:{xl:0, lg:0 , md:0 , sm: 2 , xs:2}}}>
                    <p>{detailParcelle.address_full}</p>
                  </Box>
              </Box>
              <Box sx={{display: "flex", justifyContent: {xl:"space-between" , lg:"space-between" , md:"space-between" , sm:"space-between" , xs:"center"} , minWidth: {xl:"400px", lg:"400px" , md:"400px" , sm: "400px" , xs: "100%"} , flexWrap: "wrap"}}>
                <Box sx={{marginInline: {xl : 0 , lg: 0 , md: 0 , sm: 0 ,xs:1} , marginBlock:1}}>
                  <Link to="#enquete" onClick={() => scrollToElement("#enquete")} sx={{cursor: "pointer" , marginInline: {xl : 0 , lg: 0 , md: 0 , sm: 0 ,xs:1}}}>
                    <Badge badgeContent={detailParcelle.building_permit_number ? detailParcelle.building_permit_number : '0'} color="error" size="small"   anchorOrigin={{  vertical: 'top', horizontal: 'left', }}>
                      <Chip icon={<Box sx={{background: "#A3ABE0" , borderRadius: "100%" , width: "20px" , height: "20px" , display: "flex" , justifyContent: "center" , alignItems: "center" , mr: 2}}><img src={Enquete} alt="enquete"></img></Box>} label="Enquête"  sx={{cursor: "pointer" , background: "#959FDB", color: "#fff" , px: "15px", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);"}} />
                    </Badge>
                  </Link>
                </Box>
                <Box sx={{marginInline: {xl : 0 , lg: 0 , md: 0 , sm: 0 ,xs:1} , marginBlock:1}}>
                  <Link to="#transaction" onClick={() => scrollToElement("#transaction")} sx={{cursor: "pointer" , marginInline: {xl : 0 , lg: 0 , md: 0 , sm: 0 ,xs:1}}}>
                    <Badge badgeContent={detailParcelle.transactions ? (detailParcelle.transactions).length : '0'} color="error" size="small"   anchorOrigin={{  vertical: 'top', horizontal: 'left', }}>
                      <Chip icon={<Box sx={{background: "#3BA9E5" , borderRadius: "100%" , width: "20px" , height: "20px" , display: "flex" , justifyContent: "center" , alignItems: "center" , mr: 2}}><img src={Transaction} alt="transaction"></img></Box>} label="Transaction" sx={{cursor: "pointer" , background: "#299CDB", color: "#fff" , px: "15px", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);"}} />
                    </Badge>
                  </Link>
                </Box>
                <Chip icon={<Box sx={{background: "#4E5FC1" , borderRadius: "100%" , width: "20px" , height: "20px" , display: "flex" , justifyContent: "center" , alignItems: "center" , mr: 2}}><img src={Gestion} alt="gestion"></img></Box>} label="Gérer" sx={{background: "#3F50B6", color: "#fff" , px: "15px", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25);" , marginInline: {xl : 0 , lg: 0 , md: 0 , sm: 0 ,xs:1} , marginBlock:1}}/>
              </Box>
            </Box>
            {detailParcelle && <DetailMap detailMapData={detailParcelle} />}
          </Box>
        </Box>
      </Box>
      <DetailInfos />
      <EnqueteDetail detailEnquete={detailParcelle} />
      <TransactionDetail detailTransaction={detailParcelle} />
    </>
  )
}

export default DetailParcelle;
