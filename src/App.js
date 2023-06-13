import logo from "./logo.svg";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import * as faker from "faker";
import "./App.css";
import React, { useState } from "react";

function App() {
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );
  const [people, setPeople] = React.useState([]);
  const [time, setTime] = useState(new Date());
  React.useEffect(() => {
    setPeople(
      [...Array(10000).keys()].map((key) => {
        return {
          id: key,
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          bio: faker.lorem.lines(Math.random() * 100),
        };
      })
    );
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <div className="App">
      <h1>{time.toISOString()}</h1>
      <div style={{ width: "100%", height: "100vh" }}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={people.length}
              rowRenderer={({ key, index, style, parent }) => {
                const person = people[index];
                return (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    <div style={style}>
                      <h2>{person.name}</h2>
                      <p>{person.bio}</p>
                    </div>
                  </CellMeasurer>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>
      {/* <ul>
        {people.map((person) => (
          <li key={person.id + person.name}>
            <h2>{person.name}</h2>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
