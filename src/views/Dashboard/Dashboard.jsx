import React, {useEffect, useState} from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// react plugin for creating vector maps

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

import {
  dashboardActiveUsersChart,
  dashboardSummerChart,
} from "variables/charts.jsx";

import {getTotals, worldChart} from "../../data/cases";

import jacket from "assets/img/saint-laurent.jpg";
import shirt from "assets/img/balmain.jpg";
import swim from "assets/img/prada.jpg";

import { table_data } from "variables/general.jsx";

const Dashboard = () => {
  const [totals, setTotals] = useState({
    "TotalConfirmed": 0,
    "TotalDeaths": 0,
    "TotalRecovered": 0
  });
  useEffect(() => {
    getTotals().then((data) => {
      setTotals(data);
    });
  }, []);
    return (
      <>
        <PanelHeader
          size="lg"
          content={
              <Line
                data={worldChart.data}
                options={worldChart.options}
              />
          }
        />
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <Card className="card-stats card-raised">
                <CardBody>
                  <Row>
                    <Col md="4">
                      <div className="statistics">
                        <div className="info">

                          <div className="icon icon-info">
                            <i className="now-ui-icons users_single-02" />
                          </div>
                          <h3 className="info-title">{totals.TotalConfirmed}</h3>
                          <h6 className="stats-title">Total Confirm</h6>
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="statistics">
                        <div className="info">
                          <div className="icon icon-danger">
                            <i className="now-ui-icons users_single-02" />
                          </div>
                          <h3 className="info-title">
                            {totals.TotalDeaths}
                          </h3>
                          <h6 className="stats-title">Total Deaths</h6>
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="statistics">
                        <div className="info">
                          <div className="icon icon-success">
                            <i className="now-ui-icons users_single-02" />
                          </div>
                          <h3 className="info-title">{totals.TotalRecovered}</h3>
                          <h6 className="stats-title">Total Recover</h6>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
}

export default Dashboard;
