import React, { useState } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import { withStyles} from '@material-ui/core/styles';
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

//TODO clean up styles for app
const styles = (theme) => ({
    cardStyles :{
        [theme.breakpoints.down('sm')]: {
            width:"90%",
        },
          [theme.breakpoints.up('md')]: {
            width:"50%",
        },
          [theme.breakpoints.up('lg')]: {
            width:"30%",
        },
        backgroundColor: 'palevioletred',
    },
    input: {
        margin:'1em',
        borderBottomColor:'#ffffff'
    },
      cssUnderline: {
        '&:after': {
          borderBottomColor: '#ffffff',
        },
      },
    button: {
        [theme.breakpoints.down('sm')]: {
            width:"70%",
        },
        color:'#ffffff',
        backgroundColor:'#00BCD4'
    }
  });

const App = styled.div `
    background-color:#607D8B;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:100%;
`;

function Summary(props) {
    const { classes } = props;
    const [summary, setResult] = useState("enter a term to see a summary from wikipedia");
    const [query, setQuery] = useState(null);

    const data = () => {
        var url = `/api/getSummary?data=${query}`;
        axios.get(url)
            .then(res => {
                let data = null;
                if (res.data === "") {
                    data = "please enter a valid search term";
                }
                else {
                    data = res.data;
                }
                setResult(data);
            })
    }
    return (
        <App>
            <Button variant="contained" classes={{root:classes.button}} onClick={data}>get summary from wikipedia</Button>
            <Input
            classes={{
                root:classes.input,
                underline: classes.cssUnderline,
              }}
    
        onKeyPress={(e) => {
                if (e.charCode === 13) {
                    data();
                }
            }} onChange={(e) => { setQuery(e.target.value) }}></Input>
            <Card classes={{root:classes.cardStyles}}>
                <CardContent>
                    {summary}
                </CardContent>
            </Card>
        </App>
    )
}

export default withStyles(styles)(Summary);
