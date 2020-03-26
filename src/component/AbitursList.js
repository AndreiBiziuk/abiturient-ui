import React from "react";
import FilteredTable from "./FilteredTable/FilteredTable";
import Datetime from "react-datetime";
import "moment/locale/ru.js";
import Container from "react-bootstrap/Container";
import Combo from "./Combo";

export default class AbiturList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.handleUnauthorized = this.handleUnauthorized.bind(this);
  }

  handleUnauthorized() {
    this.props.handleTokenChange("");
    this.props.handlePageChange("login");
  }

  render() {
    return (
      <>
        <h1>Список абитуриентов</h1>
        <Container>
          <Datetime locale="ru" timeFormat={false} dateFormat="YYYY-MM-DD" />
          <Combo
            {...this.props}
            label="Город"
            id="city_combo"
            filterCol="1"
            sortCol="1"
            displayCol="1"
            entity="citySelect"
            maxItems="10"
          />
          <Combo
            {...this.props}
            label="УО"
            id="uo_combo"
            filterCol="1"
            sortCol="1"
            displayCol="1"
            entity="UOSelect"
            maxItems="10"
          />
        </Container>
        <FilteredTable
          entity="abiturs"
          editEntity="abitursFull"
          handleUnauthorized={this.handleUnauthorized}
          {...this.props}
          editPage="editGeneric"
        />
      </>
    );
  }
}
