import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Badge, Box, Flex, Text, useMantineTheme } from '@mantine/core';
import ParkingSpot from './ParkingSpot.jsx';
import { motion, useAnimationControls } from 'framer-motion';
import Mercedes from '../assets/mercedes.svg';
import { db } from '../js/firebase.js';
import { ref, onValue, set, get } from 'firebase/database';

// Dữ liệu cố định
const parkingLotData = {
  id: 1,
  name: "",
  entries: 10,
  departures: 8,
  parkingSpaces: [
    { id: 1, name: "A1", history: [{ state: "OCCUPIEDa" }] },
    { id: 2, name: "A2", history: [{ state: "OCCUPIED" }] },
    { id: 3, name: "B1", history: [{ state: "OCCUPIED" }] },
    { id: 4, name: "B2", history: [{ state: "OCCUPIED" }] },
    { id: 5, name: "C1", history: [{ state: "OCCUPIED" }] },
    { id: 6, name: "C2", history: [{ state: "OCCUPIED" }] },
  ]
};



const dataFBData = {
  UID: "1@",
  isAvailable: 0,
  isPayment: 0
}

function ParkingLot() {
  let params = useParams();
  const [data, setData] = useState(parkingLotData);
  const [dataFB, setDataFB] = useState(dataFBData);
  const [prevUID, setPrevUID] = useState('');

  const controlsEntry = useAnimationControls();
  const controlsDeparture = useAnimationControls();
  const theme = useMantineTheme();

  useEffect(() => {
    // console.log(dataFB, 'Q2');

    
    parkingLotData.parkingSpaces[0].history[0].state = '';

    if (dataFB.UID === '') {
      controlsDeparture.start((i) => ({ y: [-120, 150], opacity: [0, 1, 0] }));
    } else {
      if (prevUID.UID !== dataFB.UID) {

        if (dataFB.isAvailable == '1') {
          //right
          controlsEntry.start((i) => ({ y: [150, -120], opacity: [0, 1, 0] }));

          parkingLotData.parkingSpaces[0].history[0].state = 'OCCUPIED';
        }

        if (prevUID.isAvailable == '1') {
          //left
          controlsDeparture.start((i) => ({ y: [-120, 150], opacity: [0, 1, 0] }));
        }
      } else if (prevUID.isAvailable !== dataFB.isAvailable) {
        if (prevUID.isAvailable == '1' && dataFB.isAvailable == '0') {
          //left
          controlsDeparture.start((i) => ({ y: [-120, 150], opacity: [0, 1, 0] }));
        }

        if (prevUID.isAvailable == '0' && dataFB.isAvailable == '1') {
          parkingLotData.parkingSpaces[0].history[0].state = 'OCCUPIED';

          //right
          controlsEntry.start((i) => ({ y: [150, -120], opacity: [0, 1, 0] }));
        }
      }else{
        if (prevUID.isAvailable != '1' && dataFB.isAvailable == '1') {
          parkingLotData.parkingSpaces[0].history[0].state = 'OCCUPIED';

          //right
          controlsEntry.start((i) => ({ y: [150, -120], opacity: [0, 1, 0] }));
        }

        if (prevUID.isAvailable == '1' && dataFB.isAvailable == '1') {
          parkingLotData.parkingSpaces[0].history[0].state = 'OCCUPIED';
 
        }
      }

      setData(parkingLotData);
    }

    setPrevUID(dataFB);
  }, [dataFB, prevUID, controlsEntry, controlsDeparture]);

  useEffect(() => {
    const dataRef = ref(db, 'DB');

    // Hàm để lấy và xử lý dữ liệu
    const fetchData = (snapshot) => {
      let fetchedData = snapshot.val();
      if (fetchedData == null) {
        fetchedData = {
          UID: "",
          isAvailable: 0,
          isPayment: 0
        }
      }
      // console.log(fetchedData);
      setDataFB(fetchedData);
    };

    // // Lấy dữ liệu ban đầu
    // get(dataRef).then((snapshot) => {
    //   fetchData(snapshot);
    // }).catch((error) => {
    //   console.error("Error fetching initial data: ", error);
    // });

    // Lắng nghe sự thay đổi dữ liệu
    const unsubscribe = onValue(dataRef, fetchData);

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Flex justify={'flex-start'} gap={'sm'}>
        {/* <Text>{data.name}</Text> */}
        <Badge variant={'dot'} color={'yellow'}>
          ID: {dataFB.UID}
        </Badge>
      </Flex>
      <Flex>
        <Flex direction={'column'}>
          {data.parkingSpaces.map((parkingSpace, i) => {
            if (data.parkingSpaces.length / 2 > i) {
              return (
                <ParkingSpot
                  key={parkingSpace.id}
                  leftAligned={true}
                  occupied={parkingSpace.history[0] && parkingSpace.history[0].state === 'OCCUPIED'}
                  name={parkingSpace.name}
                />
              );
            }
          })}
        </Flex>
        <Box style={{ width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              transform: 'translateY(calc(50% + 50px)) rotate(-90deg)',
              color: theme.colors.gray[3],
              fontSize: theme.fontSizes.xl,
            }}
          >
            {'<----- Entrance'}
          </Text>
        </Box>
        <Flex direction={'column'}>
          {data.parkingSpaces.map((parkingSpace, i) => {
            if (data.parkingSpaces.length / 2 <= i) {
              return (
                <ParkingSpot
                  key={parkingSpace.id}
                  leftAligned={false}
                  occupied={parkingSpace.history[0] && parkingSpace.history[0].state === 'OCCUPIED'}
                  name={parkingSpace.name}
                />
              );
            }
          })}
        </Flex>

      </Flex>
      <Flex justify={'flex-end'} gap={'sm'}>
        <Badge variant={'dot'} color={'blue'}>
          Price: {dataFB.isPayment * 5000 * dataFB.isAvailable}
        </Badge>
      </Flex>
      <motion.div
        key={`entry-motion`}
        animate={controlsEntry}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 0,
          marginLeft: '230px',
        }}
      >
        <img
          src={Mercedes}
          height={60}
          alt="mercedes car top view"
          style={{
            transform: 'rotate(90deg) translateY(-80px)',
            filter: `drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4)`,
          }}
        />
      </motion.div>
      <motion.div
        key={`departure-motion`}
        initial={{ opacity: 0 }}
        animate={controlsDeparture}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 0,
          marginLeft: '230px',
        }}
      >
        <img
          src={Mercedes}
          height={60}
          alt="mercedes car top view"
          style={{
            transform: 'rotate(-90deg) translateY(-80px)',
            filter: `drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4)`,
          }}
        />
      </motion.div>
    </Box>
  );
}

export default ParkingLot;