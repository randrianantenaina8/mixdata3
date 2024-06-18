import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterIcon from "../assets/svg/filterIcon.svg";
import Image from "react-bootstrap/Image";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { Switch } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";

const FilterModal = ({ show, onHide, onSubmit, onFilter }) => {
  const defaultValue = {
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
    lands: [],
    location: [],
    owners: [],
    nbProprioMin: 0,
    nbProprioMax: 1000000,
    history: "all",
    lastBuildPermit: "all",
    region: "all",
  };
  const [searchForm, setSearchForm] = useState(defaultValue);
  /****custom styles variables */
  const blueLight = "#299CDB";
  const graylight = "#D9D9D9";
  const brown = "#363636";

  const validateBtn = {
    background: blueLight,
    height: "40px",
    width: "auto",
    borderRadius: "8px",
    border: "none",
  };
  const reinitialiseBtn = {
    background: graylight,
    height: "40px",
    width: "auto",
    borderRadius: "8px",
    border: "none",
    color: brown,
  };
  const fontWeightTitle = {
    fontWeight: "600",
  };

  useEffect(() => {
    onFilter(searchForm)
  }, [searchForm])

  return (
    <Modal
      show={show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="border-0">
        <Modal.Title
          className="d-flex align-items-center"
          id="contained-modal-title-vcenter"
        >
          <Image
            className="fluid me-2"
            style={{ height: "20px" }}
            src={FilterIcon}
          />
          <span>Filtres</span>
        </Modal.Title>
        <CloseIcon className="pointer" onClick={() => onHide()} />
      </Modal.Header>
      <Modal.Body className=" mt-2 mb-5">
        <Form>
          <Accordion className="Filters">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
                <Accordion.Item className="border-0" eventKey="0">
                  <Accordion.Header
                    style={fontWeightTitle}
                    className="accordionHeading"
                  >
                    Zone d'affectation
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="mb-2">
                      <Form.Group className="mb-3" controlId="region">
                        <Form.Label>Zone constructible</Form.Label>
                        <Form.Control
                          as="select"
                          name="region"
                          value={searchForm.zoneNoBuilding}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              zoneNoBuilding: e.target.value,
                            }));
                          }}
                        >
                          <option value="hide">caché</option>
                          <option value="only">Affiché exclusivement</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <Accordion.Item className="border-0" eventKey="1">
                  <Accordion.Header
                    style={fontWeightTitle}
                    className="accordionHeading"
                  >
                    Parcelle
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="mb-3" controlId="area">
                      <div className="d-flex">
                        <Form.Control
                          style={{ marginInline: "5px" }}
                          type="number"
                          placeholder="Surface min"
                          name="areaMin"
                          min={0}
                          value={searchForm.areaMin}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              areaMin: e.target.value,
                            }));
                          }}
                        />
                        <Form.Control
                          style={{ marginInline: "5px" }}
                          type="number"
                          placeholder="Surface max"
                          name="areaMax"
                          min={0}
                          value={searchForm.areaMax}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              areaMax: e.target.value,
                            }));
                          }}
                        />
                      </div>
                      <Form.Group
                        className="mb-3 col-6"
                        controlId="zoneSpecial"
                      >
                        <Form.Label className="mt-3">
                          Parcelles vierges
                        </Form.Label>
                        <Form.Check
                          checked={searchForm.isBareLand}
                          label="afficher"
                          name="zoneSpecial"
                          id={`zoneSpecial-radio-1`}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              isBareLand: e.target.checked,
                            }));
                          }}
                        />
                      </Form.Group>
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </div>
            <div className="row my-4">
              <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
                <Accordion.Item className="border-0" eventKey="3">
                  <Accordion.Header className="accordionHeading">
                    Bâtiment
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="mb-3" controlId="buildingMin">
                      <Form.Label style={{ display: "block" }}>
                        année de construction
                      </Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          style={{ marginInline: "5px" }}
                          type="number"
                          placeholder="min"
                          name="buildingMin"
                          min={0}
                          value={searchForm.buildingYearMin}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              buildingYearMin: e.target.value,
                            }));
                          }}
                        />
                        <Form.Control
                          style={{ marginInline: "5px" }}
                          type="number"
                          placeholder="max"
                          name="buildingMax"
                          min={0}
                          value={searchForm.buildingAreaMax}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              buildingYearMax: e.target.value,
                            }));
                          }}
                        />
                      </div>
                      <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                          <FormControlLabel
                            control={<Switch />}
                            value={searchForm.sansDate}
                            onChange={() => {
                              setSearchForm((prev) => ({
                                ...prev,
                                sansDate: true,
                              }));
                            }}
                            label="Masquer les bât. sans date"
                          />
                        </FormGroup>
                      </FormControl>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="nbNiveau">
                      <Form.Label style={{ display: "block" }}>
                        Emprise au sol
                      </Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          style={{ marginInline: "5px" }}
                          type="number"
                          placeholder="min"
                          min={0}
                          value={searchForm.buildingAreaMin}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              buildingAreaMin: e.target.value,
                            }));
                          }}
                        />
                        <Form.Control
                          style={{ marginInline: "5px" }}
                          type="number"
                          placeholder="max"
                          min={0}
                          value={searchForm.buildingAreaMax}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              buildingAreaMax: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="nbNiveau">
                      <Form.Label style={{ display: "block" }}>
                        nombre de niveau
                      </Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          style={{ marginInline: "5px" }}
                          type="number"
                          placeholder="min"
                          name="nbNiveauMin"
                          min={0}
                          value={searchForm.nbNiveauMin}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              nbNiveauMin: e.target.value,
                            }));
                          }}
                        />
                        <Form.Control
                          style={{ marginInline: "5px" }}
                          type="number"
                          placeholder="max"
                          name="nbNiveauMax"
                          min={0}
                          value={searchForm.nbNiveauMax}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              nbNiveauMax: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3 col-6" controlId="zoneSpecial">
                      <Form.Label>Bâtiments protégés</Form.Label>
                      <Form.Check
                        label="masquer"
                        name="zoneSpecial"
                        value="hide"
                        type={"radio"}
                        checked={searchForm.zoneSpecial === "hide"}
                        onChange={(e) => {
                          setSearchForm((prev) => ({
                            ...prev,
                            zoneSpecial: e.target.value,
                          }));
                        }}
                      />
                      <Form.Check
                        label="Afficher exclusivement"
                        name="zoneSpecial"
                        value="only"
                        type={"radio"}
                        checked={searchForm.zoneSpecial === "only"}
                        onChange={(e) => {
                          setSearchForm((prev) => ({
                            ...prev,
                            zoneSpecial: e.target.value,
                          }));
                        }}
                      />
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <Accordion.Item className="border-0" eventKey="4">
                  <Accordion.Header
                    style={fontWeightTitle}
                    className="accordionHeading"
                  >
                    Logement(s)
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="mb-3" controlId="logement">
                      <Form.Label style={{ display: "block" }}>
                        Nombre de logements
                      </Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          value={searchForm.logementMin}
                          style={{ marginInline: "5px" }}
                          type="number"
                          placeholder="min"
                          name="logementMin"
                          min={0}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              logementMin: Number(e.target.value),
                            }));
                          }}
                        />
                        <Form.Control
                          style={{ marginInline: "5px" }}
                          value={searchForm.logementMax}
                          type="number"
                          placeholder="max"
                          name="logementMax"
                          min={0}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              logementMax: Number(e.target.value),
                            }));
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
                <Accordion.Item className="border-0" eventKey="5">
                  <Accordion.Header
                    style={fontWeightTitle}
                    className="accordionHeading"
                  >
                    Propriété
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Label>Type de parcelle</Form.Label>
                    <Form.Control
                      as="select"
                      name="propertyType"
                      placeholder="Veuillez selectionner une localisation"
                      value={searchForm.propertyType}
                      onChange={(e) => {
                        setSearchForm((prev) => ({
                          ...prev,
                          propertyType: e.target.value,
                        }));
                      }}
                    >
                      <option value="all">tout</option>
                      <option value="private">privé ou bien-fonds</option>
                      <option value="public">public</option>
                    </Form.Control>

                    <Form.Label className="mt-3">Propriétaire</Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Veuillez selectionner une localisation"
                      value={searchForm.propertyOwner || "all"}
                      onChange={(e) => {
                        setSearchForm((prev) => ({
                          ...prev,
                          propertyOwner: e.target.value,
                        }));
                      }}
                    >
                      <option value="all">tout</option>
                      <option value="private">privé</option>
                      <option value="public">public</option>
                    </Form.Control>

                    <Form.Label className="mt-3">
                      Forme de la propriété
                    </Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Veuillez selectionner une localisation"
                      value={searchForm.proprioForm}
                      onChange={(e) => {
                        setSearchForm((prev) => ({
                          ...prev,
                          proprioForm: e.target.value,
                        }));
                      }}
                    >
                      <option value="all">tout</option>
                      <option value="private">privé</option>
                      <option value="coproprio">co-propriétaire</option>
                    </Form.Control>

                    <Form.Group className="my-3" controlId="nbProprio">
                      <Form.Label style={{ display: "block" }}>
                        Nombre de propriétaire(s)
                      </Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          style={{ marginInline: "5px" }}
                          type="number"
                          placeholder="min"
                          name="nbProprioMin"
                          min={0}
                          value={searchForm.nbProprioMin}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              nbProprioMin: e.target.value,
                            }));
                          }}
                        />
                        <Form.Control
                          style={{ marginInline: "5px" }}
                          type="number"
                          placeholder="max"
                          name="nbProprioMax"
                          min={0}
                          value={searchForm.nbProprioMax}
                          onChange={(e) => {
                            setSearchForm((prev) => ({
                              ...prev,
                              nbProprioMax: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <Accordion.Item className="border-0" eventKey="6">
                  <Accordion.Header
                    style={fontWeightTitle}
                    className="accordionHeading"
                  >
                    Historique
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="mb-3" controlId="history">
                      <Form.Label>Historique des parcelles</Form.Label>
                      <Form.Control
                        as="select"
                        value={searchForm.history}
                        onChange={(e) => {
                          setSearchForm((prev) => ({
                            ...prev,
                            history: e.target.value,
                          }));
                        }}
                      >
                        <option value="all">tout</option>
                        <option value="withHistory">avec historique</option>
                        <option value="withoutHistory">sans historique</option>
                      </Form.Control>
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </div>
          </Accordion>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pb-4">
        <Button
          onClick={() => {
            setSearchForm(defaultValue);
          }}
          style={Object.assign(reinitialiseBtn, fontWeightTitle)}
        >
          Réinitialiser
        </Button>
        <Button
          onClick={() => onSubmit()}
          style={Object.assign(validateBtn, fontWeightTitle)}
        >
          Valider
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
