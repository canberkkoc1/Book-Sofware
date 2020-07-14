import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

import styles from "./book.module.css";


export default class book extends Component {
  state = {
    books: [],
    deger: "",
   
  };





  componentDidMount() {
    this.getBooks();
  }



  getBooks = () => {
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => this.setState({ books: data }));
  };

  handleChange(e) {
    this.setState({ deger: e.target.value });
  };

  render() {
     const {deger,books} = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="search..."
          value={deger}
          onChange={this.handleChange.bind(this)}
        />
        
        <div className={styles.container}>
          {books.filter(book=> book.categories[0]===deger || book.categories[1]===deger     
              
          ).map( (book,index) => (
              <Card key={index} className={styles.root}>
                <CardActionArea>
                  <img src={book.thumbnailUrl} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      <span>Title:</span> {book.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <span>Description:</span> {book.shortDescription}
                    </Typography>
                    <Typography
                      variant="body3"
                      color="textSecondary"
                      component="p"
                    >
                      <span>Authors:</span> {book.authors}
                    </Typography>
                    <Typography
                      variant="body3"
                      color="textSecondary"
                      component="p"
                    >
                      <span>Categories:</span>
                      {book.categories}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </div>
      </div>
    );
  }
}
