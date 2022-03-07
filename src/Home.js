import React from "react";
import { Row, Container } from "react-bootstrap";
import { Carousel } from "3d-react-carousal";
import Header from "./header";

const Home = () => {


  
  let slides = [
    <img
      src="https://res.cloudinary.com/practicaldev/image/fetch/s--54ca_F2q--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/1wwdyw5de8avrdkgtz5n.png"
      alt="1"
    />,
    <img src="https://miro.medium.com/max/792/1*lJ32Bl-lHWmNMUSiSq17gQ.png" alt="2" />,
    <img src="https://www.drupal.org/files/project-images/bootstrap-stack.png" alt="3" />,
    
  ];
  return (
    <>
    <Header />
      <br></br>
      <Container>
        <br></br>
        <Row className = "carousel">
          {/* <Col md="auto"> */}
          <Carousel slides={slides} autoplay={false} interval={1000} />
          {/* </Col> */}

          {/* <Col md="auto">Variable width content</Col>
         <Col xs lg="2">
           3 of 3
         </Col> */}
        </Row>
        <br></br>
        <Row className="justify-content">
          <h1 className="font-weight-bold">Design of Crud App</h1>
          <p>
            <span className="font-italic font-weight-bold">
              CRUD Meaning :{" "}
            </span>{" "}
            CRUD is an acronym that comes from the world of computer programming
            and refers to the four functions that are considered necessary to
            implement a persistent storage application: create, read, update and
            delete.Persistent storage refers to any data storage device that
            retains power after the device is powered off, such as a hard disk
            or a solid-state drive. In contrast, random access memory and
            internal caching are two examples of volatile memory - they contain
            data that will be erased when they lose power.
          </p>
        </Row>
        <Row className="justify-content">
          <h1 className="font-weight-bold">
            Tools Used In Building This Web App
          </h1>
          <p>
            <span className="font-italic font-weight-bold">React JS : </span>{" "}
            React makes it painless to create interactive UIs. Design simple
            views for each state in your application, and React will efficiently
            update and render just the right components when your data changes.
            Declarative views make your code more predictable and easier to
            debug.
          </p>
          <p>
            <span className="font-italic font-weight-bold">Bootstrap : </span>{" "}
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
            Declarative views make your code more predictable and easier to
            debug.
          </p>
          <p>
            <span className="font-italic font-weight-bold">HTML : </span> HTML
            is the language for describing the structure of Web pages. HTML
            gives authors the means to: Publish online documents with headings,
            text, tables, lists, photos, etc. Retrieve online information via
            hypertext links, at the click of a button.
          </p>
          <p>
            <span className="font-italic font-weight-bold">CSS : </span>{" "}
            Cascading Style Sheets (CSS) is a simple mechanism for adding style
            (e.g., fonts, colors, spacing) to Web documents. These pages contain
            information on how to learn and use CSS and on available software.
            They also contain news from the CSS working group.
          </p>
        </Row>
      </Container>
    </>
  );
};

export default Home;
