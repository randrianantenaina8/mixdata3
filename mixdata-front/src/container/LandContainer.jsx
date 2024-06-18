import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@mui/material/TablePagination";
import Table from "react-bootstrap/Table";

import TableRowLand from "../component/TableRowLand";
import jwtInterceptor from "../service/jwtInterceptor";
import LayersIcon from "@mui/icons-material/Layers";
import MapsLayout from "../component/MapsLayout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SwipeIcon from "@mui/icons-material/Swipe";
import Image from "react-bootstrap/Image";
import FilterIcon from "@assets/svg/filterIcon.svg";
import FilterModal from "../component/FilterModal";
import { Button } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { API_URL } from "@utils/constants";
import { useToast } from "../Context/ToastContext";

const InputedStyle = {
  height: "37px",
  backgroundColor: "#F3F3F9",
  border: "none",
  borderRadius: "5px",
  maxWidth: "287px",
  width: "100%",
  
  '@media(max-width: 500px)' : {
    ml: "0!important"
  }
};
const iconColor = {
  fill: "#8E91A0",
  height: "20px",
  width: "20px",
};

const LandContainer = (props) => {
  const DEFAULT_PER_PAGE = 10;
  const DEFAULT_PAGE = 0;

  const toaster = useToast();

  const [total, setTotal] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PER_PAGE);
  const [searchForm, setSearchForm] = useState({
    zoneNoBuilding: "all",
    zoneSpecial: "all",
    areaMin: 0,
    areaMax: 1000000,
    isBareLand: false,
    buildingAreaMin: 0,
    buildingAreaMax: 1000000,
    buildingYearMin: "1800",
    buildingYearMax: "2023",
    sansDate: false,
    renovationMin: 0,
    renovationMax: 1000000,
    renovationFinised: false,
    nbNiveauMin: 0,
    nbNiveauMax: 1000000,
    logementMin: 0,
    logementMax: 1000000,
    propertyOwner: null,
    propertyType: "all",
    proprioForm: "all",
    term: "",
    lands: [],
    location: [],
    owners: [],
    nbProprioMin: 0,
    nbProprioMax: 1000000,
    history: "all",
    lastBuildPermit: "all",
    size: 10,
    page: 0,
    region: "all",
  });
  const [loading, setLoading] = useState(true)
  const [clicked, setClicked] = useState(false);
  const [clickShow, setClickShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");

  const colums = [
    { accessor: "code_number", show: "Parcelle" },
    { accessor: "area", show: "Surface" },
    { accessor: "address_full", show: "Addresse" },
    { accessor: "principal_type", show: "Zone d'affectation" },
    { accessor: "bare_land", show: "Vierge" },
    { accessor: "public_property", show: "Propriété" },
    { accessor: "type", show: "Type" },
    { accessor: "building_nb", show: "Bât/année" },
  ];

  const handleChangePage = (event, newPage) => {
    setLoading(true)
    setPage(newPage);
    getData(rowsPerPage, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    getData(event.target.value, page);
  };

  const handleShowModal = () => {
    setModalShow(true);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      searchLocationFn();
    }
  };

  const searchfn = async (filter) => {
    return await jwtInterceptor
      .post(`${API_URL}/lands/search`, filter)
      .then((res) => {
        setTotal(res.data.data.total);
        setDataTable(res.data.data.results);
        setLoading(false)
      })
      .catch((error) => {
        toaster.notifyError(error.message)
      });
  };

  const searchLocationFn = async () => {
    setLoading(true)
    return await jwtInterceptor
      .post(`${API_URL}/lands/search`, searchForm)
      .then((res) => {
        setTotal(res.data.data.total);
        setDataTable(res.data.data.results);
        setLoading(false)
      })
      .catch((error) => {
        toaster.notifyError(error.message)
      });
  };

  const getData = (perPage, page) => {
    searchfn({
      ...searchForm,
      page,
      size: perPage,
    });
  };

  const getDataFiltered = () => {
    searchfn(searchForm).then(() => setModalShow(false));
  };

  const changeTitle = () => {
    setClicked(!clicked);
  };
  const hideMaps = () => {
    setClickShow(!clickShow);
  };
  const fontWeightTitle = {
    fontWeight: "600",
  };

  useEffect(() => {
    jwtInterceptor
      .post(`${API_URL}/lands/search`, {
        ...searchForm,
        size: DEFAULT_PER_PAGE,
        page: DEFAULT_PAGE,
      })
      .then((res) => {
        setTotal(res.data.data.total);
        setDataTable(res.data.data.results);
        setLoading(false)
      })
      .catch((error) => {
        console.log('error in useEffect')
        toaster.notifyError(error.message)
      });
  }, []);

  return (
    <div className={"my-4 d-flex" + (clicked ? " maphidden" : " mapshowen")}>
      <div
        className={
          "listparcels h-auto m-0 position-relative z-index" +
          " " +
          (clickShow ? " d-none" : " d-block")
        }
      >
        <div
          className={
            "d-xl-block d-lg-none d-sm-none d-none z-index" +
            " " +
            (clicked
              ? "position-absolute end-0 top-50 mapSwitchList hided"
              : "position-absolute end-0 top-50 mapSwitchList")
          }
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={changeTitle}
          >
            <SwipeIcon />
          </button>
        </div>
        <Paper
          className={
            "py-4 px-4 rounded shadow-none App-container w-100 m-0 overflow-hidden position-relative z-index h-100" +
            " " +
            (clickShow ? " d-none" : " d-block")
          }
        >
          <div className="d-flex justify-content-xl-between justify-content-sm-between mb-5 align-items-center flex-wrap">
            <h3 style={{...fontWeightTitle , marginRight: "1.5rem"}}>Parcelles</h3>
            <div>
              <Form.Group
                className="align-items-center d-xl-flex d-lg-flex d-md-flex d-sm-flex d-flex"
                style={InputedStyle}
              >
                <Form.Control
                  className="input bg-transparent border-0"
                  type="text"
                  placeholder="Mot-clés"
                  style={{ color: "#8E91A0", fontWeight: "501" }}
                  onKeyUp={handleKeyUp}
                  onChange={(e) => {
                    setSearchForm((prev) => ({
                      ...prev,
                      term: e.target.value
                    }))
                  }}
                />
                <Button variant="outline-light" onClick={searchLocationFn}>
                  <SearchIcon className=" start ms-2" style={iconColor} />
                </Button>
              </Form.Group>
            </div>
            <Image
              src={FilterIcon}
              className="fluid ms-3 pointer"
              onClick={() => handleShowModal()}
            ></Image>
            <LayersIcon
              className="d-xl-none d-lg-block pointer"
              style={{ fontSize: 30 }}
              onClick={hideMaps}
            />
          </div>
          <div className="overflow-auto">
            <Table style={{ width: "1614px" }}>
              <thead
                style={{
                  background: "#F3F7F9",
                  borderBottom: "2px #DEE2E6 solid",
                  fontWeight: "normal",
                  color: "#363636",
                  marginBottom: "5px",
                }}
              >
                <tr class="parcelles-table">
                  <th className="text-center">Actions</th>
                  {colums.map((field) => {
                    return (
                      <th
                        align="left"
                        key={field.accessor}
                      >
                        {field.show}
                      </th>
                    );
                  })}
                  <th className="text-center">Historique</th>
                </tr>
              </thead>
              <tbody className="parcelTables">
                {loading ? (
                  <tr>
                    <td colSpan={colums.length + 2} style={{width: "1614px"}}>Chargement en cours...</td>
                  </tr>
                ) : dataTable.length > 0 ? (
                  dataTable.map((row, index) => (
                    <TableRowLand key={row._source.id} keyIndex={index} row={row} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={colums.length} style={{width: "1614px"}}>Aucun résultat trouvé</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={total}
            page={!page || page <= 0 ? 0 : page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage= "Lignes par page"
            onRowsPerPageChange={handleChangeRowsPerPage}
            backIconButtonProps={{
              "aria-label": "Précédent",
              className: "PreviousBtn",
            }}
            nextIconButtonProps={{
              "aria-label": "Suivant",
              className: "NextBtn",
            }}
          />
        </Paper>
      </div>
      <div
        className={
          "lg-screens" +
          " " +
          (clicked
            ? "maps overflow-hidden hided"
            : "normal maps overflow-hidden") +
          (clickShow ? " showed position-relative overflow-hidden" : " hided")
        }
        style={{
          width: "100%",
        }}
      >
        <MapsLayout />
        <div className="position-absolute end-0 top-0 bg-white p-1 m-3 rounded">
          <FormatListBulletedIcon
            className="d-xl-none d-lg-block pointer"
            style={{ fontSize: 30 }}
            onClick={hideMaps}
          />
        </div>
      </div>
      <div>
        <FilterModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          onFilter={(item) => {
            setSearchForm((prev) => ({
              ...prev,
              ...item
            }))
          }}
          onSubmit={getDataFiltered}
        />
      </div>
    </div>
  );
};

export default LandContainer;
