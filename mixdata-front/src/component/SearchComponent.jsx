import * as React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import Form from "react-bootstrap/Form";

import InputAutocomplete from "./InputAutocomplete";
import { Button } from "react-bootstrap";

function SearchComponent(props) {
  const search = props.onSubmitFn;
  const handleFormChange = props.onFormChange;
  const INITIAL_STATE = props.init;
  const regionOptions = props.regions;

  const [form, setForm] = React.useState(INITIAL_STATE);
  const [show, setShow] = React.useState(false);

  const handleChange = (event) => {
    let val =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    if (event.target.name === "proprioForm" && val === "public") {
      handleFieldChange("propertyOwner", "public");
    }
    handleFieldChange(
      event.target.name,
      val === "" ? INITIAL_STATE[event.target.name] : val
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search(form);
  };

  // const handleReset = (event) => {
  //   event.preventDefault();
  //   setForm(INITIAL_STATE);
  //   search(INITIAL_STATE);
  // };

  const handleShowForm = () => {
    setShow(!show);
  };

  const handleFieldChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    handleFormChange({
      ...form,
      [field]: value,
    });

    if (field === "owners" || field === "lands" || field === "location") {
      search({
        ...form,
        [field]: value,
      });
    }
  };

  // getRegionData();

  const getPropertyOwner = () => {
    if (form.propertyType === "privé") {
      return (
        <>
          <Form.Group className="mb-3" controlId="propertyOwner">
            <Form.Label>type propriétaire</Form.Label>
            <Form.Control
              as="select"
              name="propertyOwner"
              onChange={handleChange}
            >
              <option value="all">Tout</option>
              <option value="privé">Privé ou société</option>
              <option value="public">public</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="proprioForm">
            <Form.Label>form proprio</Form.Label>
            <Form.Control
              as="select"
              name="proprioForm"
              onChange={handleChange}
            >
              <option value="all">tout</option>
              <option value="private">propriété individuelle</option>
              <option value="coproprio">coproprio</option>
              <option value="public">proprio commune</option>
              {/* <option value="public">propriété par étage(PPE)</option> */}
            </Form.Control>
          </Form.Group>
        </>
      );
    } else {
      <></>;
    }
  };

  return (
    <>
      <IconButton
        onClick={handleShowForm}
        color="inherit"
        aria-label="rechercher"
        edge="start"
        type="submit"
      >
        <SearchIcon />
      </IconButton>

      <div
        className="mb-2"
        style={{ display: show === true ? "block" : "none" }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="region">
            <Form.Label>canton</Form.Label>
            <Form.Control as="select" name="region" onChange={handleChange}>
              <option value="all">tout</option>
              {regionOptions?.map((region) => {
                return (
                  <option key={region._source.name}>
                    {region._source.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="parcelle">
            <InputAutocomplete
              accessField="nb_parcelle"
              placeholder="Parcelle"
              label="Parcelle"
              name="term"
              field="lands"
              handleFieldChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="location">
            <InputAutocomplete
              accessField="name"
              placeholder="Location"
              label="Commune"
              name="term"
              field="location"
              handleFieldChange={handleFieldChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="owner">
            <InputAutocomplete
              style={{ marginInline: "5px" }}
              accessField="name"
              placeholder="nom"
              label="Proriétaire"
              name="owner"
              field="owners"
              handleFieldChange={handleFieldChange}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="zoneSpecial"
            onChange={handleChange}
          >
            <Form.Label>plan Spéciaux</Form.Label>
            <Form.Check
              reverse
              label="afficher"
              name="zoneSpecial"
              value="show"
              type={"radio"}
              id={`zoneSpecial-radio-1`}
            />
            <Form.Check
              reverse
              label="masquer"
              name="zoneSpecial"
              value="hide"
              type={"radio"}
              id={`zoneSpecial-radio-2`}
            />
            <Form.Check
              reverse
              label="exclusivement"
              name="zoneSpecial"
              value="only"
              type={"radio"}
              id={`zoneSpecial-radio-3`}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="zoneNoBuilding"
            onChange={handleChange}
          >
            <Form.Label>Zone constructible</Form.Label>
            <Form.Check
              reverse
              label="afficher"
              name="zoneNoBuilding"
              value="show"
              type={"radio"}
              id={`zoneNoBuilding-radio-1`}
            />
            <Form.Check
              reverse
              label="masquer"
              name="zoneNoBuilding"
              value="hide"
              type={"radio"}
              id={`zoneNoBuilding-radio-2`}
            />
            <Form.Check
              reverse
              label="exclusivement"
              name="zoneNoBuilding"
              value="only"
              type={"radio"}
              id={`zoneNoBuilding-radio-3`}
            />
          </Form.Group>

          {/* surface  */}
          <Form.Group className="mb-3" controlId="area">
            <Form.Label style={{ display: "block" }}>Surface</Form.Label>
            <Form.Control
              style={{ marginInline: "5px" }}
              type="number"
              placeholder="min"
              name="areaMin"
              min={0}
              onChange={handleChange}
            />
            <Form.Control
              style={{ marginInline: "5px" }}
              type="number"
              placeholder="max"
              name="areaMax"
              min={0}
              onChange={handleChange}
            />
          </Form.Group>

          {/* année de construction */}
          <Form.Group className="mb-3" controlId="buildingMin">
            <Form.Label style={{ display: "block" }}>
              année de construction
            </Form.Label>
            <Form.Control
              style={{ marginInline: "5px" }}
              type="number"
              placeholder="min"
              name="buildingMin"
              min={0}
              onChange={handleChange}
            />
            <Form.Control
              style={{ marginInline: "5px" }}
              type="number"
              placeholder="max"
              name="buildingMax"
              min={0}
              onChange={handleChange}
            />
          </Form.Group>

          {/* niveau batiment */}
          <Form.Group className="mb-3" controlId="nbNiveau">
            <Form.Label style={{ display: "block" }}>
              nombre de niveau
            </Form.Label>
            <Form.Control
              style={{ marginInline: "5px" }}
              type="number"
              placeholder="min"
              name="nbNiveauMin"
              min={0}
              onChange={handleChange}
            />
            <Form.Control
              style={{ marginInline: "5px" }}
              type="number"
              placeholder="max"
              name="nbNiveauMax"
              min={0}
              onChange={handleChange}
            />
          </Form.Group>

          {/* logementMin */}
          <Form.Group className="mb-3" controlId="logement">
            <Form.Label style={{ display: "block" }}>logement</Form.Label>
            <Form.Control
              style={{ marginInline: "5px" }}
              type="number"
              placeholder="min"
              name="logementMin"
              min={0}
              onChange={handleChange}
            />
            <Form.Control
              style={{ marginInline: "5px" }}
              type="number"
              placeholder="max"
              name="logementMax"
              min={0}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="nbProprio">
            <Form.Label style={{ display: "block" }}>nombre proprio</Form.Label>
            <Form.Control
              style={{ marginInline: "5px" }}
              type="number"
              placeholder="min"
              name="nbProprioMin"
              min={0}
              onChange={handleChange}
            />
            <Form.Control
              style={{ marginInline: "5px" }}
              type="number"
              placeholder="max"
              name="nbProprioMax"
              min={0}
              onChange={handleChange}
            />
          </Form.Group>

          {/* propriete */}
          <Form.Group className="mb-3" controlId="propertyType">
            <Form.Label style={{ display: "block" }}>type parcelle</Form.Label>
            <Form.Control
              style={{ marginInline: "5px" }}
              as="select"
              name="propertyType"
              onChange={handleChange}
            >
              <option value="all">Tout</option>
              <option value="privé">Privé ou bien-fonds</option>
              <option value="public">public</option>
            </Form.Control>
          </Form.Group>

          {getPropertyOwner()}

          <Form.Group className="mb-3" controlId="history">
            <Form.Label style={{ display: "block" }}>
              dernière transaction
            </Form.Label>
            <Form.Control
              style={{ marginInline: "5px" }}
              as="select"
              name="history"
              onChange={handleChange}
            >
              <option value="all">Tout</option>
              <option value="withHistory">Avec historique</option>
              <option value="withoutHistory">Sans historique</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastBuildPermit">
            <Form.Label style={{ display: "block" }}>
              dernière permis de construction
            </Form.Label>
            <Form.Control
              style={{ marginInline: "5px" }}
              as="select"
              name="history"
              onChange={handleChange}
            >
              <option value="all">Tout</option>
              <option value="withHistory">Avec historique</option>
              <option value="withoutHistory">Sans historique</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Button onClick={handleSubmit}>Rechercher</Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
export default SearchComponent;
