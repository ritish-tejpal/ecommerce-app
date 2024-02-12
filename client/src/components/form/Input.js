import TextField from "@mui/material/TextField";

export const Input = ({ label, type, id, placeholder }) => {
    return (
        <div>
            <TextField
                id="outlined-basic"
                label={label}
                variant="outlined"
                name={id}
                type={type}
                onChange={}
            /><br /><br />
        </div>
        );
  }
  