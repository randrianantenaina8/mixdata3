import React, { useState, useRef } from "react";
import { Box, Autocomplete, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SimpleInputFile from "../../inputfile/simpleinputfile";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContactsData from "../staticapi/contacts.json";
import ListApi from "../../listcrm/staticApi/ListCrm.json"
import jwtInterceptor from "../../../service/jwtInterceptor";
import { CONTACT_ENDPOINTS } from "../../../utils/api";

const CreateContact = ({ closeIt, numParcelle }) => {
  const [file, setFile] = useState([]);
  const [mails, setMails] = useState([]);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [habitation, setHabitation] = useState("");
  const [numeroFixe, setNumeroFix] = useState("");
  const [numeroMobile, setNumeroMobile] = useState("");
  const [email, setEmail] = useState("");
  const [siteWeb, setSiteWeb] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [types, setType] = useState("");
  

  //Toasts
  const champsvide = () =>
    toast.warn("Veuillez compléter les champs obligatoires");
  const successtoast = () => toast.success("Contact créé avec succès");

  const initialContacts = JSON.parse(localStorage.getItem("ContactsData"))?.personnes || [];
  const [contacts, setContacts] = useState(initialContacts);
  

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 897,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const getPhoneNumbers = () => {
    return  [
      {
        number: numeroFixe,
        type: "work"
      },
      {
        number: numeroFixe,
        type: "mobile"
      }
    ]
  }

  const handleAddContact = async () => {


    const contactRequest = buildContactRequest();
    const newContactResponse = await jwtInterceptor.post(CONTACT_ENDPOINTS.new, contactRequest)

    const newContact = newContactResponse.data.data.records[0]

    updateContactLocalStorage(newContact)

    successtoast();

  };

  const buildContactRequest = () => {
    const phone_numbers = getPhoneNumbers();
    const landsAttribute = [
      {
        _id: numParcelle
      }
    ]

    console.log("types", types)

    return {
      lastName: nom,
      firstName: prenom,
      address: habitation,
      phones: phone_numbers,
      site_web : siteWeb,
      facebook,
      linkedin,
      twitter,
      whatsapp,
      types: types,
      lands: landsAttribute
    };
  }

  const updateContactLocalStorage = (newContact) => {
    const existingContacts = JSON.parse(localStorage.getItem("ContactsData"))?.personnes || [];

    const listContact = {
        nom,
        prenom,
        type: newContact.types
    }

    setContacts((prevContacts) => [...prevContacts, newContact] , (prevListContacts) => [...prevListContacts , listContact]);
      
    const updatedData = {
      personnes: [...existingContacts, newContact]
    };
    localStorage.setItem("ContactsData", JSON.stringify(updatedData));

    setTimeout(() => {
      closeIt();
    }, 1000);


  }

  console.log(contacts)

  const handleAddEmail = () => {
    setMails((prevMails) => [
      ...prevMails,
      { id: prevMails.length + 2, label: `email ${prevMails.length + 2}` },
    ]);
  };

  const handleUpload = (files) => {
    setFile(files);
  };
  const type = [
    {
      label: "Propriétaire",
      value: "Propriétaire",
    },
    {
      label: "Prospect",
      value: "Prospect",
    },
  ];
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Box sx={style}>
        <h4 style={{ marginBottom: 20 }}>Création de contact</h4>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { my: 1, maxWidth: "400px" },
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              required
              id="nom"
              label="nom"
              fullWidth
              value={nom} onChange={(e) => setNom(e.target.value)} 
            />
            <TextField required id="prenom" label="prénom" fullWidth value={prenom} onChange={(e) => setPrenom(e.target.value)}  />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              required
              id="numero_fixe"
              label="fixe"
              fullWidth
              type="number"
              value={numeroFixe} onChange={(e) => setNumeroFix(e.target.value)} 
            />
            <TextField
              required
              id="numero_mobile"
              label="mobile"
              fullWidth
              type="number"
              value={numeroMobile} onChange={(e) => setNumeroMobile(e.target.value)} 
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField required id="habitation" label="Adresse" fullWidth value={habitation} onChange={(e) => setHabitation(e.target.value)}  />
            <Autocomplete
              disablePortal
              id="type"
              sx={{ width: "50%", display: "flex", justifyContent: "flex-end" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "100%" }}
                  label="type de contact"
                />
              )}
              fullWidth
              options={type}
              onInputChange={(event, newInputValue) => {
                setType(newInputValue);
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <TextField required id="email" label="email 1" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}  />
            {mails.map((email) => (
              <TextField
                key={email.id}
                required
                id={`outlined-required-${email.id}`}
                label={email.label}
                fullWidth
              />
            ))}
            <AddCircleIcon sx={{ color: "#299CDB" }} onClick={handleAddEmail} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="facebook"
              id="facebook"
              sx={{ width: "50%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FacebookOutlinedIcon sx={{ color: "#1196f5" }} />
                  </InputAdornment>
                ),
              }}
              value={facebook} onChange={(e) => setFacebook(e.target.value)} 
            />
            <TextField
              label="linkedin"
              id="linkedin"
              sx={{ width: "50%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LinkedInIcon sx={{ color: "#0a66c2" }} />
                  </InputAdornment>
                ),
              }}
              value={linkedin} onChange={(e) => setLinkedin(e.target.value)} 
            />
            <TextField
              label="twitter"
              id="twitter"
              sx={{ width: "50%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <TwitterIcon sx={{ color: "#1d9bf0" }} />
                  </InputAdornment>
                ),
              }}
              value={twitter} onChange={(e) => setTwitter(e.target.value)} 
            />
            <TextField
              label="whatsapp"
              id="whatsapp"
              sx={{ width: "50%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <WhatsAppIcon sx={{ color: "#25d366" }} />
                  </InputAdornment>
                ),
              }}
              value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} 
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <SimpleInputFile handleUpload={handleUpload} />
            <TextField
              required
              id="site_web"
              label="site web"
              fullWidth
              sx={{ width: "50%" }}
              value={siteWeb} onChange={(e) => setSiteWeb(e.target.value)} 
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button
              sx={{
                background: "#757575",
                color: "#fff",
                "&:hover": { background: "#757575" },
                mr: 2,
              }}
              onClick={closeIt}
            >
              Annuler
            </Button>
            <Button
              sx={{
                background: "#299CDB",
                color: "#fff",
                "&:hover": { background: "#299CDB" },
              }}
              onClick={handleAddContact}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateContact;
