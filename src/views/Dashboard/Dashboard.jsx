import React, {useEffect, useState} from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
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

import {getGraphic, getTotals, worldChart} from "../../data/cases";

const Dashboard = () => {
  const formatter = new Intl.NumberFormat('en-US');
  let { id } = useParams();
  const [data, setData] = useState(worldChart([], []));

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
  useEffect(() => {
    getGraphic(id).then((data) => {
      setData(data);
    })
  }, [id])


    return (
      <>
        <PanelHeader
          size="lg"
          content={
              <Line
                data={data}
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
                          <h3 className="info-title">{formatter.format(totals.TotalConfirmed)}</h3>
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
                            {formatter.format(totals.TotalDeaths)}
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
                          <h3 className="info-title">{formatter.format(totals.TotalRecovered)}</h3>
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
