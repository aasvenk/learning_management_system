import {
  Alert,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField,
  TextareaAutosize
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FileUpload from "./FileUpload";

function Assignments() {
  const { role } = useSelector((state) => state.user.userInfo);
  const [view, setView] = useState([]);
  const {id} = useParams()

  const ViewAll = ({changeView}) => {
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
      axios
      .get('/course/' + id + '/assignment/all')
      .then((res) => {
        const {assignments} = res.data
        setAssignments(assignments)
      })
      .catch((err) => {
        console.log(err)
      })
    }, [])
    
    return (
      <Box>
        <h2>All Assignments</h2>
        {/* {assignments.length === 0 && (
          <Box sx={{ textAlign: "center" }}>
            <img src="/undraw_void_3ggu.png" alt="Empty" height={500}></img>
            <Typography>No assignments</Typography>
          </Box>
        )} */}
        {assignments.length !== 0 && (
          <Box sx={{ textAlign: "center" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignments.map((row, index) => (
                    <TableRow key={index} onClick={() => changeView(['view_single', row.id])} sx={{cursor: 'pointer'}}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    );
  };

  const Create = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
    })
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    const handleSubmit = (e) => {
      e.preventDefault()
      axios
      .post('/course/' + id + '/assignment/create', formData)
      .then((res) => {
        const {status} = res.data
        if (status === 'success') {
          alert('Created successfully')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    return (
      <Box>
        <h2>Create Assignment</h2>
        <Alert severity="info">Go to assignment in "View all" after creating to upload files</Alert>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ width: "100%", marginTop: 5 }}
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <br/>
          <TextareaAutosize
            style={{ width: "100%", marginTop: 5 }}
            minRows={10}
            maxRows={10}
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">Save</Button>
        </form>
      </Box>
    );
  };

  const Assignment = ({assignment_id}) => {
    const [assignment, setAssignment] = useState({
      title: '',
      description: '',
      files: ['file']
    })
    useEffect(() => {
      axios
      .get('/assignment/' + assignment_id)
      .then((res) => {
        const {assignment} = res.data
        setAssignment(assignment)
      })
      .catch((err) => {
        console.log(err)
      })
    }, [])
    return (
      <Box>
        <h2>{assignment.title}</h2>
        <p>{assignment.description}</p>
        <h3>Files</h3>
        <ul>
          {assignment.files.map((item, index) => {
            return (
              <li key={index}><a href={process.env.REACT_APP_BASE_URL + '/assignment/file/' + item.filepath} target="_blank" rel="noreferrer">{item.filename}</a></li>
            )
          })}
        </ul>
        <br/>
        <br/>
        <br/>
        {role === 'Instructor' && (
          <Box>
            <h2>Instructor Area</h2>
          <hr/>
          <h3>Upload new file</h3>
            <FileUpload
              assignmentId={assignment.id}
              uploadPath="/assignment/file/upload"
              onfileUpload={(file) => alert("File uploaded successfully")}
            />
          </Box>
        )}
      </Box>
      
    )
  }

  const toRender = () => {
    switch (view[0]) {
      case "view_all":
        return <ViewAll changeView={(view) => setView(view)}/>;
      case "create":
        return <Create />;
      case 'view_single':
        return <Assignment assignment_id={view[1]}/>
      default:
        return <ViewAll changeView={(view) => setView(view)}/>;
    }
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ margin: "auto" }}>
        <Grid item xs={3}>
          <List>
            <ListItem
              disablePadding
              onClick={() => {
                setView(["view_all"]);
              }}
            >
              <ListItemButton>
                <ListItemText primary="View All" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => {
                setView(["create"]);
              }}
            >
              <ListItemButton>
                <ListItemText primary="Create" />
              </ListItemButton>
            </ListItem>
          </List>
          {/* </Box> */}
        </Grid>
        <Grid item xs={8}>
          {toRender()}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Assignments;