import React, { useState, useEffect } from "react"
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import * as parkDate from "./parks.json"
import avatar from '@src/assets/images/icons/point_arret.png'
import 'mapbox-gl/dist/mapbox-gl.css'
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader
} from 'reactstrap'
const ChartjsLineChart = () => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    height: "450vh",
    width: "450vh",
    zoom: 10
  })
  const [selectedPark, setSelectedPark] = useState(null)

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null)
      }
    }
    window.addEventListener("keydown", listener)

    return () => {
      window.removeEventListener("keydown", listener)
    }
  }, [])
  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <div>
          <CardTitle className='mb-75' tag='h4'>
            Carte
          </CardTitle>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: '450px' }}>
          <ReactMapGL
            {...viewport}
            mapboxAccessToken='pk.eyJ1IjoidmlyZ2lsOTgiLCJhIjoiY2w3Z2c1aXd2MDQ0OTN1bjFoYTF1cGY3dyJ9.U_ryriPZlR1MnPFvn5NESQ'
            mapStyle="mapbox://styles/virgil98/cl@@4fnwybg001g14liyk70nf2w"
            onViewportChange={viewport => {
              setViewport(viewport)
            }}
          >
            {parkDate.features.map(park => (
              <Marker
                key={park.properties.PARK_ID}
                latitude={park.geometry.coordinates[1]}
                longitude={park.geometry.coordinates[0]}
              >
                <img src={avatar} alt="Skate Park Icon" height="30" />
                {/* <button
                  className="marker-btn"
                  onClick={e => {
                    e.preventDefault()
                    setSelectedPark(park)
                  }}
                >
                  
                </button> */}
              </Marker>
            ))}

            {selectedPark ? (
              <Popup
                latitude={selectedPark.geometry.coordinates[1]}
                longitude={selectedPark.geometry.coordinates[0]}
                onClose={() => {
                  setSelectedPark(null)
                }}
              >
                <div>
                  <h2>{selectedPark.properties.NAME}</h2>
                  <p>{selectedPark.properties.DESCRIPTIO}</p>
                </div>
              </Popup>
            ) : <p>rien</p>}
          </ReactMapGL>        </div>
      </CardBody>
    </Card>
  )
}

export default ChartjsLineChart
