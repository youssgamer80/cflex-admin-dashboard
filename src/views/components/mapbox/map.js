import { useRef, useState, useEffect } from "react"
import mapboxgl from 'mapbox-gl'// import * as parkDate from "./parks.json"
// import avatar from '@src/assets/images/icons/point_arret.png'
import 'mapbox-gl/dist/mapbox-gl.css'
import './index.css'
import { useSelector } from 'react-redux'
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
import icon from '@src/assets/images/icons/point_arret.png'
mapboxgl.accessToken =
  'pk.eyJ1IjoidmlyZ2lsOTgiLCJhIjoiY2w3Z2c1aXd2MDQ0OTN1bjFoYTF1cGY3dyJ9.U_ryriPZlR1MnPFvn5NESQ'

const ChartjsLineChart = ({ points }) => {
  const mapContainerRef = useRef(null)

  const [lng, setLng] = useState(-3.9810149)
  const [lat, setLat] = useState(5.2973998)
  const [zooM, setZoom] = useState(14)
  const store = useSelector(state => state.genererTroncon)
  const [mapObject, setMap] = useState()
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/virgil98/cl4fnwybg001g14liyk70nf2w',
      center: [lng, lat],
      zoom: zooM
    })

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    console.log("selector", store.selected)
    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4))
      setLat(map.getCenter().lat.toFixed(4))
      setZoom(map.getZoom().toFixed(2))
    })
    map.loadImage(icon, function (error, image) { //this is where we load the image file 
      if (error) throw error
      map.addImage("custom-marker", image)//this is where we name the image file we are loading 

    })
    setMap(map)

    // return () => map.remove()
  }, [])
  points.forEach((location) => {
    new mapboxgl.Marker()
      .setLngLat(location.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 30 })
        .setHTML(`<h2>${location.city}</h2> <p>${location.location}</p>`))
      .addTo(mapObject)

  })

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
        <div style={{ height: '460px' }}>
          <div>
            <div className='sidebarStyle'>
              <div>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zooM}
              </div>
            </div>
            <div className='map-container' ref={mapContainerRef} style={{ width: '100%' }} />
          </div>      </div>
      </CardBody>
    </Card>
  )
}

export default ChartjsLineChart
