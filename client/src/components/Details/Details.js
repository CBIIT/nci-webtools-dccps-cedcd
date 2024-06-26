import React, { Component } from "react";
import "./Details.css";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PageSummary from "../PageSummary/PageSummary";
import Paging from "../Paging/Paging";
import TableHeader from "../TableHeader/TableHeader";
import TableHeaderMiddle from "../TableHeader/TableHeaderMiddle";
import SelectBox from "../SelectBox/SelectBox";
import GenderList from "../GenderList/GenderList";
import RaceList from "../RaceList/RaceList";
import TypeList from "../TypeList/TypeList";
import EthnicityList from "../EthnicityList/EthnicityList";
import AgeList from "../AgeList/AgeList";
import CollectedDataList from "../CollectedDataList/CollectedDataList";
import CollectedSpecimensList from "../CollectedSpecimensList/CollectedSpecimensList";
import CollectedCancersList from "../CollectedCancersList/CollectedCancersList";
import DiseaseStateList from "../DiseaseStateList/DiseaseStateList";
import FloatingSubmit from "./FloatingSubmit";
import TabBoard from "./TabBoard";
import BoxBoard from "./BoxBoard";
import Workbook from "../Workbook/Workbook";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { red } from "@material-ui/core/colors";

class Details extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      list: [],
      filter: {
        participant: {
          gender: [],
          race: [],
          ethnicity: [],
          age: [],
          type: [],
        },
        collect: {
          cancer: [],
          data: [],
          specimen: [],
          allCancer: false,
        },
        study: {
          state: [],
        },
      },
      advancedFilter: {
        gender: [],
        age: [],
        state: [],
        race: [],
        ethnicity: [],
        type: [],
        cancer: [],
        data: [],
        specimen: [],
        booleanOperationBetweenField: ["AND", "AND", "AND", "AND", "AND", "AND", "AND", "AND", "AND"],
        booleanOperationWithInField: ["OR", "OR", "OR", "OR", "OR", "OR", "OR", "OR", "OR"],
        allCancer: false,
      },
      orderBy: {
        column: "cohort_name",
        order: "asc",
      },
      pageInfo: { page: 1, pageSize: 15, total: 0 },
      lastPage: 1,
      selected: [],
      comparasion: false,
      currTab: 0,
      selectAll: false,
      collapse: true,
      searchState: true,
      prevBasicParams: {},
      prevAdvancedParam: {},
      advancedCondition: "AND",
      loadingDataStatus: false,
    };
    this.toFocus = React.createRef();
  }

  saveHistory = () => {
    const state = Object.assign({}, this.state);
    let item = {
      filter: state.filter,
      advancedFilter: state.advancedFilter,
      orderBy: state.orderBy,
      selected: state.selected,
      comparasion: state.comparasion,
      currTab: state.currTab,
      pageInfo: state.pageInfo,
      searchState: state.searchState,
    };
    sessionStorage.setItem("informationHistory_select", JSON.stringify(item));
  };

  //Expand and collapse the filter-panel
  toggle() {
    this.setState((state) => ({ collapse: !state.collapse }));
  }

  setAllToFalse() {
    this.setState((state) => ({ selectAll: false }));
  }

  //Sends the information to the api to export to an excel file
  loadingData = (next) => {
    const state = Object.assign({}, this.state);
    let reqBody = {
      filter: state.filter,
      advancedFilter: state.advancedFilter,
      selectionList: state.selectionList,
      items: state.items,
      booleanStates: state.booleanStates,
      orderBy: state.orderBy,
      paging: state.pageInfo,
      advancedCondition: state.advancedCondition,
    };
    reqBody.paging.page = 0;

    if (this.state.searchState == true) {
      fetch("./api/export/select", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          let list = result.data;
          next(list);
        });
    } else {
      fetch("./api/export/advancedSelect", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          let list = result.data;
          next(list);
        });
    }
  };

  gotoPage(i) {
    if (this.state.searchState == true) {
      this.pageData(i);
    } else {
      this.pageData(i);
    }
  }

  async pageData(i, orderBy, filter, selected) {
    this.setState({ loadingDataStatus: true });

    if (this.state.searchState == true) {
      const state = Object.assign({}, this.state);
      const lastPage = state.pageInfo.page == 0 ? state.lastPage : state.pageInfo.page;
      let reqBody = this.state.prevBasicParams;
      if (i == -1) {
        reqBody.paging.page = state.lastPage;
      } else {
        reqBody.paging.page = i;
      }
      const result = await fetch("./api/cohort/select", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (result) {
        let list = result.data.list;
        reqBody.paging.total = result.data.total;
        this.setState((prevState) => ({
          list: list,
          filter: reqBody.filter,
          orderBy: reqBody.orderBy,
          pageInfo: reqBody.paging,
          lastPage: i > -1 ? lastPage : i,
          selected: selected ? selected : prevState.selected,
          comparasion: false,
          loadingDataStatus: false,
          searchState: state.searchState,
        }));
      } else {
        this.setState((prevState) => ({
          list: [],
          filter: reqBody.filter,
          orderBy: reqBody.orderBy,
          pageInfo: reqBody.paging,
          lastPage: i > -1 ? lastPage : i,
          selected: selected ? selected : prevState.selected,
          comparasion: false,
          loadingDataStatus: false,
          searchState: state.searchState,
        }));
      }
    } else {
      const state = Object.assign({}, this.state);
      const lastPage = state.pageInfo.page == 0 ? state.lastPage : state.pageInfo.page;
      let reqBody = this.state.prevAdvancedParam;
      if (i == -1) {
        reqBody.paging.page = state.lastPage;
      } else {
        reqBody.paging.page = i;
      }

      const response = await fetch("./api/cohort/advancedSelect", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (result) {
        let list = result.data.list;
        reqBody.paging.total = result.data.total;
        this.setState((prevState) => ({
          list: list,
          advancedFilter: reqBody.advancedFilter,
          orderBy: reqBody.orderBy,
          pageInfo: reqBody.paging,
          lastPage: i > -1 ? lastPage : i,
          selected: selected ? selected : prevState.selected,
          comparasion: false,
          loadingDataStatus: false,
          searchState: state.searchState,
        }));
      } else {
        this.setState((prevState) => ({
          list: [],
          advancedFilter: reqBody.advancedFilter,
          orderBy: reqBody.orderBy,
          pageInfo: reqBody.paging,
          lastPage: i > -1 ? lastPage : i,
          selected: selected ? selected : prevState.selected,
          comparasion: false,
          loadingDataStatus: false,
          searchState: state.searchState,
        }));
      }
    }
  }

  clearFilter = () => {
    this.setAllToFalse();
    if (document.getElementById("cancerAll") !== null) {
      document.getElementById("cancerAll").checked = false;
    }
    let orderBy = {
      column: "cohort_name",
      order: "asc",
    };
    let filter = {
      participant: {
        gender: [],
        race: [],
        ethnicity: [],
        age: [],
        type: [],
      },
      collect: {
        cancer: [],
        data: [],
        specimen: [],
        allCancer: false,
      },
      study: {
        state: [],
      },
    };

    const previousState = sessionStorage.getItem("informationHistory_select");
    if (previousState) {
      let state = JSON.parse(previousState);
      let item = {
        filter: filter,
        advancedFilter: state.advancedFilter,
        orderBy: orderBy,
        comparasion: false,
        selected: [],
        currTab: 0,
        pageInfo: state.pageInfo,
        searchState: state.searchState,
      };
      sessionStorage.setItem("informationHistory_select", JSON.stringify(item));
    }
    this.filterData(1, orderBy, filter, []);
  };

  goBack2Filter = () => {
    if (this.state.searchState) {
      this.filterData(this.state.pageInfo.page);
    } else {
      this.advancedFilterData(this.state.pageInfo.page);
    }
    this.updateHistory(false);
  };

  //Handles when the filter button for the basic search is hit
  toFilter = () => {
    this.toggle();
    this.setAllToFalse();
    this.saveHistory();
    this.filterData(1, null, null, []);
  };

  //Switches between the basic and advanced search
  switchSearchType = () => {
    this.setState({
      searchState: !this.state.searchState,
    });

    const previousState = sessionStorage.getItem("informationHistory_select");
    if (previousState) {
      let state = JSON.parse(previousState);
      if (this.state.searchState == false) {
        this.filterData(state.pageInfo.page, state.orderBy, state.filter);
      } else {
        this.advancedFilterData(state.pageInfo.page, state.orderBy, state.advancedFilter);
      }
    } else {
      if (this.state.searchState == false) {
        this.filterData(this.state.pageInfo.page);
      } else {
        this.advancedFilterData(this.state.pageInfo.page);
      }
    }
  };

  async loadFilterData(reqBody, i, selected, lastPage) {
    const response = await fetch("./api/cohort/select", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result) {
      let list = result.data.list;
      reqBody.paging.total = result.data.total;
      this.setState((prevState) => ({
        list: list,
        filter: reqBody.filter,
        orderBy: reqBody.orderBy,
        pageInfo: reqBody.paging,
        lastPage: i > -1 ? lastPage : i,
        selected: selected ? selected : prevState.selected,
        comparasion: false,
        loadingDataStatus: false,
      }));
    } else {
      this.setState((prevState) => ({
        list: [],
        filter: reqBody.filter,
        orderBy: reqBody.orderBy,
        pageInfo: reqBody.paging,
        lastPage: i > -1 ? lastPage : i,
        selected: selected ? selected : prevState.selected,
        comparasion: false,
        loadingDataStatus: false,
      }));
    }
  }

  filterData(i, orderBy, filter, selected) {
    this.setState({ loadingDataStatus: true });
    const state = Object.assign({}, this.state);
    const lastPage = state.pageInfo.page == 0 ? state.lastPage : state.pageInfo.page;
    let reqBody = {
      filter: state.filter,
      orderBy: state.orderBy,
      paging: state.pageInfo,
    };
    if (i == -1) {
      reqBody.paging.page = state.lastPage;
    } else {
      reqBody.paging.page = i;
    }
    if (orderBy) {
      reqBody.orderBy = orderBy;
    }
    if (filter) {
      reqBody.filter = filter;
    }
    this.setState({
      prevBasicParams: JSON.parse(JSON.stringify(reqBody)),
    });

    this.loadFilterData(reqBody, i, selected, lastPage);
  }

  clearAdvancedFilter = () => {
    this.setAllToFalse();
    let orderBy = {
      column: "cohort_name",
      order: "asc",
    };
    let advancedFilter = {
      gender: [],
      age: [],
      state: [],
      race: [],
      ethnicity: [],
      cancer: [],
      data: [],
      type: [],
      specimen: [],
      booleanOperationBetweenField: ["AND", "AND", "AND", "AND", "AND", "AND", "AND", "AND", "AND"],
      booleanOperationWithInField: ["OR", "OR", "OR", "OR", "OR", "OR", "OR", "OR", "OR"],
      allCancer: false,
    };
    const previousState = sessionStorage.getItem("informationHistory_select");
    if (previousState) {
      let state = JSON.parse(previousState);
      let item = {
        filter: state.filter,
        advancedFilter: advancedFilter,
        orderBy: orderBy,
        pageInfo: state.pageInfo,
        searchState: state.searchState,
      };
      sessionStorage.setItem("informationHistory_select", JSON.stringify(item));
    }
    this.advancedFilterData(1, orderBy, advancedFilter, []);
  };

  toAdvancedFilter = () => {
    this.toggle();
    this.setAllToFalse();
    this.saveHistory();
    this.advancedFilterData(1, null, null, []);
  };
  async loadAdvFilterData(reqBody, i, selected, lastPage) {
    const response = await fetch("./api/cohort/advancedSelect", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result) {
      let list = result.data.list;
      reqBody.paging.total = result.data.total;

      this.setState((prevState) => ({
        list: list,
        advancedFilter: reqBody.advancedFilter,
        orderBy: reqBody.orderBy,
        pageInfo: reqBody.paging,
        lastPage: i > -1 ? lastPage : i,
        selected: selected ? selected : prevState.selected,
        comparasion: false,
        loadingDataStatus: false,
      }));
    } else {
      this.setState((prevState) => ({
        list: [],
        advancedFilter: reqBody.advancedFilter,
        orderBy: reqBody.orderBy,
        pageInfo: reqBody.paging,
        lastPage: i > -1 ? lastPage : i,
        selected: selected ? selected : prevState.selected,
        comparasion: false,
        loadingDataStatus: false,
      }));
    }
  }
  advancedFilterData(i, orderBy, advancedFilter, selected) {
    this.setState({ loadingDataStatus: true });
    const state = Object.assign({}, this.state);
    const lastPage = state.pageInfo.page == 0 ? state.lastPage : state.pageInfo.page;
    let reqBody = {
      advancedFilter: state.advancedFilter,
      orderBy: state.orderBy,
      paging: state.pageInfo,
      advancedCondition: state.advancedCondition,
    };
    if (i == -1) {
      reqBody.paging.page = state.lastPage;
    } else {
      reqBody.paging.page = i;
    }
    if (orderBy) {
      reqBody.orderBy = orderBy;
    }
    if (advancedFilter) {
      reqBody.advancedFilter = advancedFilter;
    }
    this.setState({
      prevAdvancedParam: JSON.parse(JSON.stringify(reqBody)),
    });
    this.loadAdvFilterData(reqBody, i, selected, lastPage);
  }

  handleOrderBy(column) {
    let orderBy = Object.assign({}, this.state.orderBy);
    if (column == orderBy.column) {
      orderBy.order = orderBy.order == "asc" ? "desc" : "asc";
    } else {
      orderBy.column = column;
      orderBy.order = "asc";
    }
    let pageInfo = Object.assign({}, this.state.pageInfo);
    if (this.state.searchState == true) {
      this.filterData(pageInfo.page, orderBy);
    } else {
      this.advancedFilterData(pageInfo.page, orderBy);
    }
  }

  handleSelect(id, e) {
    let selected;
    if (id === -1) {
      selected = [];
      if (e.target.checked) {
        //select all cohorts
        if (this.state.searchState == true) {
          const state = Object.assign({}, this.state);
          /*let reqBody = {
						filter:state.filter,
						orderBy:state.orderBy,
						paging:{}
					};*/
          let reqBody = this.state.prevBasicParams;

          reqBody.paging.page = 0;
          fetch("./api/cohort/select", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((result) => {
              let list = result.data.list;
              list.forEach(function (t) {
                selected.push(t.id);
              });
              this.setState({
                selected: selected,
                selectAll: true,
              });
            });
        } else {
          const state = Object.assign({}, this.state);
          /*let reqBody = {
						filter: state.filter,
						selectionList: state.selectionList,
						items: state.items,
						booleanStates: state.booleanStates,
						orderBy:state.orderBy,
						paging:{}
					};*/
          let reqBody = this.state.prevAdvancedParam;
          reqBody.paging.page = 0;
          fetch("./api/cohort/advancedSelect", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((result) => {
              let list = result.data.list;
              list.forEach(function (t) {
                selected.push(t.id);
              });
              this.setState({
                selected: selected,
                selectAll: true,
              });
            });
        }
      } else {
        this.setState({
          selected: selected,
          selectAll: false,
        });
      }
    } else {
      selected = Object.assign([], this.state.selected);
      let idx = selected.indexOf(id);
      if (idx >= 0) {
        selected.splice(idx, 1);
      } else {
        selected.push(id);
      }
      this.setState({
        selected: selected,
        selectAll: false,
      });
    }
  }

  handleGenderClick = (v) => {
    const filter = Object.assign({}, this.state.filter);
    let idx = filter.participant.gender.indexOf(v.id);

    if (idx > -1) {
      //remove element
      filter.participant.gender.splice(idx, 1);
    } else {
      //add element
      filter.participant.gender.push(v.id);
    }
    this.setState({
      filter: filter,
    });
  };

  handleRaceClick = (v) => {
    const filter = Object.assign({}, this.state.filter);
    let idx = filter.participant.race.indexOf(v.id);

    if (idx > -1) {
      //remove element
      filter.participant.race.splice(idx, 1);
    } else {
      //add element
      filter.participant.race.push(v.id);
    }
    this.setState({
      filter: filter,
    });
  };

  handleTypeClick = (v) => {
    const filter = Object.assign({}, this.state.filter);
    let idx = filter.participant.type.indexOf(v.id);

    if (idx > -1) {
      //remove element
      filter.participant.type.splice(v.id, 1);
    } else {
      //add element
      filter.participant.type.push(v.id);
    }
    this.setState({
      filter: filter,
    });
  };

  handleEthnicityClick = (v) => {
    const filter = Object.assign({}, this.state.filter);
    let idx = filter.participant.ethnicity.indexOf(v.id);

    if (idx > -1) {
      //remove element
      filter.participant.ethnicity.splice(idx, 1);
    } else {
      //add element
      filter.participant.ethnicity.push(v.id);
    }
    this.setState({
      filter: filter,
    });
  };

  handleAgeClick = (v) => {
    const filter = Object.assign({}, this.state.filter);
    let idx = filter.participant.age.indexOf(v);

    if (idx > -1) {
      //remove element
      filter.participant.age.splice(idx, 1);
    } else {
      //add element
      filter.participant.age.push(v);
    }
    this.setState({
      filter: filter,
    });
  };

  handleDataClick = (v) => {
    const filter = Object.assign({}, this.state.filter);
    let idx = filter.collect.data.indexOf(v.id);

    if (idx > -1) {
      //remove element
      filter.collect.data.splice(idx, 1);
    } else {
      //add element
      filter.collect.data.push(v.id);
    }
    this.setState({
      filter: filter,
    });
  };

  handleSpecimenClick = (v) => {
    const filter = Object.assign({}, this.state.filter);
    let idx = filter.collect.specimen.indexOf(v.id);

    if (idx > -1) {
      //remove element
      filter.collect.specimen.splice(idx, 1);
    } else {
      //add element
      filter.collect.specimen.push(v.id);
    }
    this.setState({
      filter: filter,
    });
  };

  handleCancerClick = (v, allIds, e) => {
    const filter = Object.assign({}, this.state.filter);
    if (v) {
      let idx = filter.collect.cancer.indexOf(v.id);
      if (filter.collect.allCancer) filter.collect.allCancer = false;

      if (idx > -1) {
        //remove element
        filter.collect.cancer.splice(idx, 1);
      } else {
        //add element
        filter.collect.cancer.push(v.id);
      }
    } else {
      //click on the "all cohort"
      filter.collect.cancer = [];
      if (e.target.checked) {
        filter.collect.cancer = allIds;
      }
      filter.collect.allCancer = !filter.collect.allCancer;
    }
    this.setState({
      filter: filter,
    });
  };

  handleStateClick = (v) => {
    const filter = Object.assign({}, this.state.filter);
    let idx = filter.study.state.indexOf(v);

    if (idx > -1) {
      //remove element
      filter.study.state.splice(idx, 1);
    } else {
      //add element
      filter.study.state.push(v);
    }
    this.setState({
      filter: filter,
    });
  };

  handleAdvancedGenderClick = (v) => {
    const advancedFilter = Object.assign({}, this.state.advancedFilter);
    let idx = advancedFilter.gender.indexOf(v.id);

    if (idx > -1) {
      //remove element
      advancedFilter.gender.splice(idx, 1);
    } else {
      //add element
      advancedFilter.gender.push(v.id);
    }
    this.setState({
      advancedFilter: advancedFilter,
    });
  };

  handleAdvancedRaceClick = (v) => {
    const advancedFilter = Object.assign({}, this.state.advancedFilter);
    let idx = advancedFilter.race.indexOf(v.id);

    if (idx > -1) {
      //remove element
      advancedFilter.race.splice(idx, 1);
    } else {
      //add element
      advancedFilter.race.push(v.id);
    }
    this.setState({
      advancedFilter: advancedFilter,
    });
  };

  handleAdvancedEthnicityClick = (v) => {
    const advancedFilter = Object.assign({}, this.state.advancedFilter);
    let idx = advancedFilter.ethnicity.indexOf(v.id);

    if (idx > -1) {
      //remove element
      advancedFilter.ethnicity.splice(idx, 1);
    } else {
      //add element
      advancedFilter.ethnicity.push(v.id);
    }
    this.setState({
      advancedFilter: advancedFilter,
    });
  };

  handleAdvancedAgeClick = (v) => {
    const advancedFilter = Object.assign({}, this.state.advancedFilter);
    let idx = advancedFilter.age.indexOf(v);

    if (idx > -1) {
      //remove element
      advancedFilter.age.splice(idx, 1);
    } else {
      //add element
      advancedFilter.age.push(v);
    }
    this.setState({
      advancedFilter: advancedFilter,
    });
  };

  handleAdvancedTypeClick = (v) => {
    const advancedFilter = Object.assign({}, this.state.advancedFilter);
    let idx = advancedFilter.type.indexOf(v.id);

    if (idx > -1) {
      //remove element
      advancedFilter.type.splice(idx, 1);
    } else {
      //add element
      advancedFilter.type.push(v.id);
    }
    this.setState({
      advancedFilter: advancedFilter,
    });
  };

  handleAdvancedDataClick = (v) => {
    const advancedFilter = Object.assign({}, this.state.advancedFilter);
    let idx = advancedFilter.data.indexOf(v.id);

    if (idx > -1) {
      //remove element
      advancedFilter.data.splice(idx, 1);
    } else {
      //add element
      advancedFilter.data.push(v.id);
    }
    this.setState({
      advancedFilter: advancedFilter,
    });
  };

  handleAdvancedSpecimenClick = (v) => {
    const advancedFilter = Object.assign({}, this.state.advancedFilter);
    let idx = advancedFilter.specimen.indexOf(v.id);

    if (idx > -1) {
      //remove element
      advancedFilter.specimen.splice(idx, 1);
    } else {
      //add element
      advancedFilter.specimen.push(v.id);
    }
    this.setState({
      advancedFilter: advancedFilter,
    });
  };

  handleAdvancedCancerClick = (v, allIds, e) => {
    const advancedFilter = Object.assign({}, this.state.advancedFilter);
    if (v) {
      let idx = advancedFilter.cancer.indexOf(v.id);
      if (advancedFilter.allCancer) advancedFilter.allCancer = false;
      if (idx > -1) {
        //remove element
        advancedFilter.cancer.splice(idx, 1);
      } else {
        //add element
        advancedFilter.cancer.push(v.id);
      }
    } else {
      //click on the "all cohort"
      advancedFilter.cancer = [];
      if (e.target.checked) {
        advancedFilter.cancer = allIds;
      }
      advancedFilter.allCancer = !advancedFilter.allCancer;
    }
    this.setState({
      advancedFilter: advancedFilter,
    });
  };

  handleAdvancedStateClick = (v) => {
    const advancedFilter = Object.assign({}, this.state.advancedFilter);
    let idx = advancedFilter.state.indexOf(v);

    if (idx > -1) {
      //remove element
      advancedFilter.state.splice(idx, 1);
    } else {
      //add element
      advancedFilter.state.push(v);
    }
    this.setState({
      advancedFilter: advancedFilter,
    });
  };

  updateHistory = (status) => {
    const state = Object.assign({}, this.state);
    let item = {
      filter: state.filter,
      advancedFilter: state.advancedFilter,
      orderBy: state.orderBy,
      selected: state.selected,
      comparasion: status,
      currTab: state.currTab,
      pageInfo: state.pageInfo,
      searchState: state.searchState,
    };
    sessionStorage.setItem("informationHistory_select", JSON.stringify(item));
  };

  handleComparasion = () => {
    this.setState({
      comparasion: true,
    });
    this.updateHistory(true);
  };

  handleBooleanChange(e, index) {
    const advancedFilter = Object.assign({}, this.state.advancedFilter);
    advancedFilter.booleanOperationBetweenField[index] = e.target.value;
    this.setState({
      advancedFilter: advancedFilter,
    });
  }

  handleBooleanFilterChange(e) {
    this.setState({ advancedCondition: e.target.value });
  }

  handleBooleanWithinChange(e, index) {
    const advancedFilter = Object.assign({}, this.state.advancedFilter);
    advancedFilter.booleanOperationWithInField[index] = e.target.value;
    this.setState({
      advancedFilter: advancedFilter,
    });
  }

  renderSearchFilters() {
    const { searchState } = this.state;
    if (searchState) {
      return (
        <div className="panel-body">
          <div className="filter row">
            <div className="col-sm-3 filterCol">
              <div className="filter-component">
                <h3>Eligibility Requirements</h3>
                <div className="col-sm-12">
                  <GenderList
                    hasUnknown={false}
                    hasBoth={true}
                    hasOnly={false}
                    values={this.state.filter.participant.gender}
                    displayMax="3"
                    onClick={this.handleGenderClick}
                  />
                  <AgeList values={this.state.filter.participant.age} displayMax="3" onClick={this.handleAgeClick} />
                  {/*<DiseaseStateList values={this.state.filter.study.state} displayMax="5" onClick={this.handleStateClick} />*/}
                  <TypeList values={this.state.filter.participant.type} displayMax="3" onClick={this.handleTypeClick} />
                </div>
              </div>
            </div>
            <div className="col-sm-3 filterCol">
              <div className="filter-component">
                <h3>Enrollments</h3>
                <div className="col-sm-12">
                  <RaceList values={this.state.filter.participant.race} displayMax="3" onClick={this.handleRaceClick} />
                  <EthnicityList
                    values={this.state.filter.participant.ethnicity}
                    displayMax="3"
                    onClick={this.handleEthnicityClick}
                  />
                </div>
              </div>
            </div>
            <div className="filterCol col-sm-6 last">
              <div className="filter-component">
                <h3>Data and Specimens Collected</h3>
                <div className="row">
                  <div className="col-sm-12">
                    <CollectedDataList
                      values={this.state.filter.collect.data}
                      displayMax="5"
                      onClick={this.handleDataClick}
                    />
                  </div>
                  <div className="col-sm-12">
                    <CollectedSpecimensList
                      values={this.state.filter.collect.specimen}
                      displayMax="5"
                      onClick={this.handleSpecimenClick}
                    />
                  </div>
                  <div className="col-sm-12">
                    <CollectedCancersList
                      hasNoCancer={false}
                      title="Cancers Collected"
                      innertitle="Cancers Collected"
                      hasSelectAll={this.state.filter.collect.allCancer}
                      values={this.state.filter.collect.cancer}
                      displayMax="5"
                      onClick={this.handleCancerClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<div className="col-12 px-0">
						<span className="col-3 px-0"><a id="switchSearchButton" className="switchSearchButtonToAdvanced" style={{ "marginTop": "2rem" }} href="javascript:void(0);" onClick={this.switchSearchType}>Advanced Search</a></span>
						<span className="col-6 px-0"><a id="filterClear"  href="javascript:void(0);" onClick={this.clearFilter}><i className="fas fa-times"></i> Clear All</a></span>
						{/*<input type="submit" name="filterEngage"  value="Search Cohorts" className="btn btn-primary mr-3" onClick={this.toFilter} /> 	<span className="col-3">
							<Button 
								variant="primary"
								onClick={this.toFilter}>
								Search Cohorts
							</Button></span>	
					</div> */}
          <Row xs={12}>
            <Col xs={3}>
              <a
                id="switchSearchButton"
                className="switchSearchButtonToAdvanced"
                style={{ marginTop: "2rem" }}
                href="javascript:void(0);"
                onClick={this.switchSearchType}>
                Advanced Search
              </a>
            </Col>
            <Col xs={5} sm={9} className="mr-0">
              <Button className="pull-right" variant="primary" onClick={this.toFilter}>
                Search Cohorts
              </Button>
              <a className="pull-right pt-0" id="filterClear" href="javascript:void(0);" onClick={this.clearFilter}>
                <i className="fas fa-times"></i> Clear All
              </a>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div className="panel-body">
          <div className="filter row">
            <div className="col-sm-12">
              <div className="filter-component">
                <div
                  className="row"
                  style={{ marginLeft: "calc(10% + 2px)", fontSize: "1.8rem", marginBottom: "1rem" }}>
                  <b>Eligibility Requirements</b>
                </div>
                <div className="row">
                  <div className="col-sm-1" style={{ width: "10%" }}></div>

                  <div className="col-sm-11" style={{ width: "90%" }}>
                    <div style={{ width: "92%", float: "left" }}>
                      <GenderList
                        hasUnknown={false}
                        hasBoth={true}
                        hasOnly={false}
                        rightBorderStyle="straight"
                        values={this.state.advancedFilter.gender}
                        displayMax="3"
                        onClick={this.handleAdvancedGenderClick}
                      />
                    </div>
                    <div style={{ width: "8%", float: "left" }}>
                      <select
                        className="btn btn-default"
                        style={{ borderColor: "#ccc", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                        value={this.state.advancedFilter.booleanOperationWithInField[0]}
                        title="Boolean operation between options in gender filter"
                        onChange={(e) => this.handleBooleanWithinChange(e, 0)}>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1" style={{ width: "15%" }}>
                    <select
                      className="btn btn-default"
                      value={this.state.advancedCondition}
                      title="Boolean Operation between filters"
                      style={{ padding: "6px 6px" }}
                      onChange={(e) => this.handleBooleanFilterChange(e)}>
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                  <div className="col-sm-11" style={{ width: "90%" }}>
                    <div style={{ width: "92%", float: "left" }}>
                      <AgeList
                        rightBorderStyle="straight"
                        values={this.state.advancedFilter.age}
                        displayMax="3"
                        onClick={this.handleAdvancedAgeClick}
                      />
                    </div>
                    <div style={{ width: "8%", float: "left" }}>
                      <select
                        className="btn btn-default"
                        style={{ borderColor: "#ccc", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                        value={this.state.advancedFilter.booleanOperationWithInField[1]}
                        title="Boolean operation between options in age filter"
                        onChange={(e) => this.handleBooleanWithinChange(e, 1)}>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1" style={{ width: "10%" }}>
                    <select
                      className="btn btn-default"
                      style={{ padding: "6px 6px" }}
                      value={this.state.advancedCondition}
                      title="Boolean Operation between filters"
                      disabled="disabled">
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                  <div className="col-sm-11" style={{ width: "90%" }}>
                    <div style={{ width: "92%", float: "left" }}>
                      <TypeList
                        rightBorderStyle="straight"
                        values={this.state.advancedFilter.type}
                        displayMax="3"
                        onClick={this.handleAdvancedTypeClick}
                      />
                    </div>
                    <div style={{ width: "8%", float: "left" }}>
                      <select
                        className="btn btn-default"
                        style={{ borderColor: "#ccc", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                        value={this.state.advancedFilter.booleanOperationWithInField[5]}
                        title="Boolean operation between options in type filter"
                        onChange={(e) => this.handleBooleanWithinChange(e, 5)}>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/*<div className="row">
									<div className="col-sm-1" style={{ "width": "10%" }}>
										<select className="btn btn-default" style={{padding: '6px 6px'}} value={this.state.advancedCondition} title="Boolean Operation between filters" disabled="disabled">
											<option value="AND">AND</option>
											<option value="OR">OR</option>
										</select>
									</div>
									<div className="col-sm-11" style={{ "width": "90%" }}>
										<div style={{ "width": "92%", "float": "left" }}>
											<DiseaseStateList rightBorderStyle="straight" values={this.state.advancedFilter.state} displayMax="5" onClick={this.handleAdvancedStateClick} />
										</div>
										<div style={{ "width": "8%", "float": "left" }}>
											<select className="btn btn-default" style={{ "borderColor": "#ccc", "borderTopLeftRadius": "0px", "borderBottomLeftRadius": "0px" }} value={this.state.advancedFilter.booleanOperationWithInField[2]} title="Boolean operation between options in state filter" onChange={e => this.handleBooleanWithinChange(e, 2)}>
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</div>
									</div> 
								</div>*/}
              </div>
            </div>
          </div>
          <div className="filter row">
            <div className="col-sm-12">
              <div className="filter-component">
                <div
                  className="row"
                  style={{ marginLeft: "calc(10% + 2px)", fontSize: "1.8rem", marginBottom: "1rem" }}>
                  <b>Enrollments</b>
                </div>
                <div className="row">
                  <div className="col-sm-1" style={{ width: "10%" }}>
                    <select
                      className="btn btn-default"
                      style={{ padding: "6px 6px" }}
                      value={this.state.advancedCondition}
                      title="Boolean Operation between filters"
                      disabled="disabled">
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                  <div className="col-sm-11" style={{ width: "90%" }}>
                    <div style={{ width: "92%", float: "left" }}>
                      <RaceList
                        rightBorderStyle="straight"
                        values={this.state.advancedFilter.race}
                        displayMax="3"
                        onClick={this.handleAdvancedRaceClick}
                      />
                    </div>
                    <div style={{ width: "8%", float: "left" }}>
                      <select
                        className="btn btn-default"
                        style={{ borderColor: "#ccc", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                        value={this.state.advancedFilter.booleanOperationWithInField[3]}
                        title="Boolean operation between options in race filter"
                        onChange={(e) => this.handleBooleanWithinChange(e, 3)}>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1" style={{ width: "10%" }}>
                    <select
                      className="btn btn-default"
                      style={{ padding: "6px 6px" }}
                      value={this.state.advancedCondition}
                      title="Boolean Operation between filters"
                      disabled="disabled">
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                  <div className="col-sm-11" style={{ width: "90%" }}>
                    <div style={{ width: "92%", float: "left" }}>
                      <EthnicityList
                        rightBorderStyle="straight"
                        values={this.state.advancedFilter.ethnicity}
                        displayMax="3"
                        onClick={this.handleAdvancedEthnicityClick}
                      />
                    </div>
                    <div style={{ width: "8%", float: "left" }}>
                      <select
                        className="btn btn-default"
                        style={{ borderColor: "#ccc", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                        value={this.state.advancedFilter.booleanOperationWithInField[4]}
                        title="Boolean operation between options in ethnicity filter"
                        onChange={(e) => this.handleBooleanWithinChange(e, 4)}>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter row">
            <div className="col-sm-12">
              <div className="filter-component">
                <div
                  className="row"
                  style={{ marginLeft: "calc(10% + 2px)", fontSize: "1.8rem", marginBottom: "1rem" }}>
                  <b>Data and Specimens Collected</b>
                </div>
                <div className="row">
                  <div className="col-sm-1" style={{ width: "10%" }}>
                    <select
                      className="btn btn-default"
                      style={{ padding: "6px 6px" }}
                      value={this.state.advancedCondition}
                      title="Boolean Operation between filters"
                      disabled="disabled">
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                  <div className="col-sm-11" style={{ width: "90%" }}>
                    <div style={{ width: "92%", float: "left" }}>
                      <CollectedDataList
                        rightBorderStyle="straight"
                        values={this.state.advancedFilter.data}
                        displayMax="5"
                        onClick={this.handleAdvancedDataClick}
                      />
                    </div>
                    <div style={{ width: "8%", float: "left" }}>
                      <select
                        className="btn btn-default"
                        style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                        value={this.state.advancedFilter.booleanOperationWithInField[6]}
                        title="Boolean operation between options in Data filter"
                        onChange={(e) => this.handleBooleanWithinChange(e, 6)}>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1" style={{ width: "10%" }}>
                    <select
                      className="btn btn-default"
                      style={{ padding: "6px 6px" }}
                      value={this.state.advancedCondition}
                      title="Boolean Operation between filters"
                      disabled="disabled">
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                  <div className="col-sm-11" style={{ width: "90%" }}>
                    <div style={{ width: "92%", float: "left" }}>
                      <CollectedSpecimensList
                        rightBorderStyle="straight"
                        values={this.state.advancedFilter.specimen}
                        displayMax="5"
                        onClick={this.handleAdvancedSpecimenClick}
                      />
                    </div>
                    <div style={{ width: "8%", float: "left" }}>
                      <select
                        className="btn btn-default"
                        style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                        value={this.state.advancedFilter.booleanOperationWithInField[7]}
                        title="Boolean operation between options in biospecimens filter"
                        onChange={(e) => this.handleBooleanWithinChange(e, 7)}>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1" style={{ width: "10%" }}>
                    <select
                      className="btn btn-default"
                      style={{ padding: "6px 6px" }}
                      value={this.state.advancedCondition}
                      title="Boolean Operation between filters"
                      disabled="disabled">
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                  <div className="col-sm-11" style={{ width: "90%" }}>
                    <div style={{ width: "92%", float: "left" }}>
                      <CollectedCancersList
                        rightBorderStyle="straight"
                        hasNoCancer={false}
                        title="Cancers Collected"
                        innertitle="Cancers Collected"
                        hasSelectAll={this.state.advancedFilter.allCancer}
                        values={this.state.advancedFilter.cancer}
                        displayMax="5"
                        onClick={this.handleAdvancedCancerClick}
                      />
                    </div>
                    <div style={{ width: "8%", float: "left" }}>
                      <select
                        className="btn btn-default"
                        style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                        value={this.state.advancedFilter.booleanOperationWithInField[8]}
                        title="Boolean operation between options in cancers filter"
                        onChange={(e) => this.handleBooleanWithinChange(e, 8)}>
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*<div className="row" style={{ "display": "flex" }}>
						<a id="switchSearchButton" className="switchSearchButtonToBasic col-sm-3 col-sm-offset-0" style={{ "marginTop": "2rem" }} href="javascript:void(0);" onClick={this.switchSearchType}>Basic Search</a>
						<a id="filterClear" className="btn-filter" href="javascript:void(0);" style={{ "marginLeft": "auto" }} onClick={this.clearAdvancedFilter}><i className="fas fa-times"></i> Clear All</a>
						{/*<input type="submit"  name="filterEngage" value="Search Cohorts" className="btn btn-primary " style={{ "marginRight": "1rem" }} onClick={this.toAdvancedFilter} />
						<Button 
							className="mr-4" 
							variant="primary" 
							disabled={this.state.advancedFilter.gender.length === 0 && this.state.advancedFilter.age.length === 0 && this.state.advancedFilter.race.length === 0 && this.state.advancedFilter.ethnicity.length === 0 && this.state.advancedFilter.data.length === 0 && this.state.advancedFilter.specimen.length === 0 && this.state.advancedFilter.cancer.length === 0}
							onClick={this.toFilter}>
							Search Cohorts
						</Button>	
					</div> */}
          <Row xs={12}>
            <Col xs={3} className="pt-2">
              <a
                id="switchSearchButton"
                className="switchSearchButtonToAdvanced"
                style={{ marginTop: "2rem" }}
                href="javascript:void(0);"
                onClick={this.switchSearchType}>
                Basic Search
              </a>
            </Col>
            <Col xs={5} sm={9} className="mr-0">
              <Button className="pull-right" variant="primary" onClick={this.toAdvancedFilter}>
                Search Cohorts
              </Button>
              <a
                className="pull-right pt-0"
                id="filterClear"
                href="javascript:void(0);"
                onClick={this.clearAdvancedFilter}>
                <i className="fas fa-times"></i> Clear All
              </a>
            </Col>
          </Row>
        </div>
      );
    }
  }

  renderSelectHeader(width) {
    return (
      <th id="table-select-col" width={width} title="Select / Deselect All Cohorts">
        <SelectBox
          id="select_all"
          label="Select / Deselect All Cohorts"
          onClick={(e) => this.handleSelect(-1, e)}
          checked={this.state.selectAll}
        />
      </th>
    );
  }

  renderTableHeader(title, width) {
    return (
      <TableHeader width={width} value={title} orderBy={this.state.orderBy} onClick={() => this.handleOrderBy(title)} />
    );
  }

  renderTableHeaderMiddle(title, width) {
    return (
      <TableHeaderMiddle
        width={width}
        align="center"
        value={title}
        orderBy={this.state.orderBy}
        onClick={() => this.handleOrderBy(title)}
      />
    );
  }

  componentDidMount() {
    if (!this._isMounted) {
      this._isMounted = true;
      const previousState = sessionStorage.getItem("informationHistory_select");
      if (previousState) {
        let state = JSON.parse(previousState);

        if (state.comparasion === true) {
          this.setState(state);
          // sessionStorage.removeItem('informationHistory_select');
        } else {
          if (this._isMounted) {
            this.setState({
              filter: state.filter,
              advancedFilter: state.advancedFilter,
              orderBy: state.orderBy,
              selected: state.selected,
              currTab: state.currTab,
              comparasion: state.comparasion,
              pageInfo: state.pageInfo,
            });
          }

          let pageId = state.pageInfo.page ? state.pageInfo.page : 1;

          if (this.state.searchState == true) {
            this.filterData(pageId, state.orderBy, state.filter);
          } else {
            this.advancedFilterData(pageId, state.orderBy, state.advancedFilter);
          }
        }
      } else {
        if (this.state.searchState == true) {
          this.filterData(this.state.pageInfo.page);
        } else {
          this.advancedFilterData(this.state.pageInfo.page);
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.state.comparasion) {
      this.saveHistory();
    } else {
      // sessionStorage.removeItem('informationHistory_select');
      const state = Object.assign({}, this.state);
      let item = {
        filter: state.filter,
        advancedFilter: state.advancedFilter,
        orderBy: state.orderBy,
        selected: [],
        comparasion: false,
        currTab: 0,
        pageInfo: state.pageInfo,
        searchState: state.searchState,
      };
      sessionStorage.setItem("informationHistory_select", JSON.stringify(item));
    }
    this._isMounted = false;
  }

  handleTabClick(i) {
    this.setState({ currTab: i });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    if (this.state.comparasion) {
      return (
        <div>
          <div id="filterLabels" className="filter-block col-md-12 lockedFilter">
            <div className="content-nav" style={{ paddingLeft: "2rem" }}>
              <a className="back" href="javascript:void(0);" onClick={this.goBack2Filter}>
                <i className="fas fa-chevron-left"></i>&nbsp;<span>Back to filter</span>
              </a>
            </div>
          </div>
          <div className="container">
            <p>
              The Cohort Overview compares the cohort design and the types of data and specimens collected across the
              cohorts you selected. To view more information about a specific cohort, select the acronym of the cohort
              at the top of the table.
            </p>
          </div>

          <div id="data-table" className="level2 col-md-12 container">
            <div id="table-header" className="container">
              <div>
                <div id="cohortDetailTabs">
                  <TabBoard currTab={this.state.currTab} onClick={(i) => this.handleTabClick(i)} />
                </div>
              </div>
            </div>
            <div className="container" style={{ overflow: "hidden" }}>
              <BoxBoard saveHistory={this.saveHistory} cohorts={this.state.selected} currTab={this.state.currTab} />
            </div>
          </div>
        </div>
      );
    } else {
      const list = this.state.list;
      //let loadstatus = this.state.list
      let content = list.map((item, index) => {
        let id = item.id;
        let url = "./cohort?id=" + id;
        let website = item.cohort_web_site;
        let website_content = "";
        if (website) {
          if (!website.startsWith("http") && !website.startsWith("www")) {
            website = "";
          }
          let website_label = website;
          if (website.length > 30) {
            website_label = website.substring(0, 27) + "...";
          }
          if (website !== "") {
            website_content = (
              <a href={website} title={website} target="_blank">
                {website_label}
              </a>
            );
          }
        }
        let select_id = "select_" + id;
        return (
          <tr key={id}>
            <td>
              <SelectBox
                id={select_id}
                label={id}
                onClick={() => this.handleSelect(id)}
                checked={this.state.selected.indexOf(id) > -1}
              />
            </td>
            <td>
              <Link to={url} onClick={this.saveHistory}>
                {item.cohort_name}
                <span style={{ color: "red" }}>{item.outdated ? "*" : ""}</span>
              </Link>
            </td>
            <td>
              <Link to={url} onClick={this.saveHistory}>
                {item.cohort_acronym}
              </Link>
            </td>
            <td>{item.type}</td>
            <td align="center">{item.enrollment_total > -1 ? this.numberWithCommas(item.enrollment_total) : 0}</td>
            <td>{website_content}</td>
            <td>
              <Moment format="MM/DD/YYYY">{item.publish_time}</Moment>
            </td>
          </tr>
        );
      });
      if (content.length === 0) {
        if (this.state.loadingDataStatus) {
          content = (
            <tr>
              <td colSpan="6">Loading data ...</td>
            </tr>
          );
        } else {
          content = (
            <tr>
              <td colSpan="6">No data is available for selected search criteria.</td>
            </tr>
          );
        }
      }

      return (
        <div>
          <input id="tourable" type="hidden" />
          <h1 className="welcome pg-title">Search Cohorts</h1>
          <p className="welcome">
            Browse the list of cohorts or use the filter options to shorten the list of cohorts according to types of
            participants, data, and specimens. Then select the cohorts about which you'd like to see details and select
            the Submit button.
          </p>
          <div id="cedcd-home-filter" className="filter-block col-md-12">
            <div id="filter-panel" className="panel panel-default">
              <div className="panel-heading" onClick={this.toggle}>
                <h2 className="panel-title">Cohort Characteristics</h2>
                <span className={`pull-right d-inline-block ${this.state.collapse ? "toggle-up" : "toggle-down"}`}>
                  <i className="fas fa-chevron-up" id="toggle-switch"></i>
                </span>
                <p className={`pull-right d-inline-block padded-string`}>
                  {this.state.collapse ? "Click to Collapse" : "Click to Expand"}
                </p>
              </div>
              {this.state.collapse && this.renderSearchFilters()}
            </div>
          </div>
          <div className="filter-block home col-md-12">
            <div className="row" style={{ display: "flex", height: "35px" }}>
              <div id="tableControls" className="" style={{ paddingLeft: "15px" }}>
                <ul className="table-controls">
                  <FloatingSubmit
                    onClick={this.handleComparasion}
                    align="true"
                    placement="top"
                    values={this.state.selected}
                  />
                </ul>
              </div>
              <div id="tableExport" style={{ paddingLeft: "1rem", paddingTop: "7px" }}>
                <Workbook
                  dataSource={this.loadingData}
                  element={
                    <a id="exportTblBtn" href="javascript:void(0);">
                      Export Table <i className="fas fa-file-export"></i>
                    </a>
                  }>
                  <Workbook.Sheet name="Cohort_Selection">
                    <Workbook.Column label="Cohort Name" value="cohort_name" />
                    <Workbook.Column label="Cohort Acronym" value="cohort_acronym" />
                    <Workbook.Column label="Cohort Type" value="type" />
                    <Workbook.Column label="Total Enrollments (n=)" value="enrollment_total" />
                    <Workbook.Column label="Website" value="cohort_web_site" />
                    <Workbook.Column label="Last Published" value="publish_time" />
                  </Workbook.Sheet>
                  <Workbook.Sheet name="Criteria"></Workbook.Sheet>
                </Workbook>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  paddingLeft: "10px",
                  paddingRight: "1rem",
                  position: "relative",
                  paddingTop: "7px",
                }}>
                <PageSummary pageInfo={this.state.pageInfo} mid="true" />
              </div>
              <div style={{ paddingRight: "15px", paddingTop: "5px" }}>
                <Paging pageInfo={this.state.pageInfo} onClick={(i) => this.gotoPage(i)} />
              </div>
            </div>
          </div>
          <div className="table-inner col-md-12">
            <div className="cedcd-table home" style={{ marginBottom: "2px", paddingBottom: "2px" }}>
              <table cellSpacing="0" cellPadding="5" useaccessibleheaders="true" showheaders="true" id="cohortGridView">
                <thead>
                  <tr id="summaryHeader" className="col-header">
                    {this.renderSelectHeader("5%")}
                    {this.renderTableHeader("cohort_name", "30%")}
                    {this.renderTableHeader("cohort_acronym", "10%")}
                    {this.renderTableHeader("type", "10%")}
                    {this.renderTableHeaderMiddle("enrollment_total", "10%")}
                    <th className="sortable" width="20%" scope="col">
                      <a href="javascript:void(0);" style={{ cursor: "default" }}>
                        Website
                      </a>
                    </th>
                    {this.renderTableHeader("publish_time", "15%")}
                  </tr>
                </thead>
                <tbody>{content}</tbody>
              </table>
            </div>
          </div>
          <div className="filter-block home col-md-12">
            <div className="row" style={{ display: "flex" }}>
              <div style={{ paddingTop: "7px", paddingLeft: "10px" }}>
                <span style={{ color: "red" }}>*</span>Indicates cohort profile has not been updated for at least 2
                years or will not have future updates.
              </div>
              <div style={{ marginLeft: "auto", paddingRight: "1rem", paddingTop: "7px" }}>
                <PageSummary pageInfo={this.state.pageInfo} mid="true" />
              </div>

              <div style={{ paddingRight: "15px", paddingTop: "5px" }}>
                <Paging pageInfo={this.state.pageInfo} onClick={(i) => this.gotoPage(i)} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default Details;
