import {
  capitalizeFirstLetter,
  replaceUnderScoreWithSpace,
} from "./character-manipulation";

function DisplayUnknownObject({ object, displayId, replaceId }) {
  /*

  object - { OBJECT to display }
  displayId - Boolean if _id should be displayed
  replaceId - "String", what to replace _id with?... example: Tracking Number

  */
  return Object.keys(object).map((key) => {
    return (
      <>
        {key === "_id" && !displayId ? (
          <></>
        ) : key === "_id" && replaceId ? (
          <li>{`${replaceId}: ${object[key]}`}</li>
        ) : (
          <li>{`${replaceUnderScoreWithSpace(capitalizeFirstLetter(key))}: ${
            object[key]
          }`}</li>
        )}
      </>
    );
  });
}

function DisplayUnknownArrayObject({ object, displayId, replaceId }) {
  return object.map((d) => (
    <ul>
      <DisplayUnknownObject
        object={d}
        displayId={displayId}
        replaceId={replaceId}
      />
    </ul>
  ));
}

function DisplayUnknownObjectWithNoKey(object) {
  if (Object.keys(object).length > 0) {
    return (
      <ul style={{ padding: "0px", margin: "0px" }}>
        {Object.keys(object).map((key) => {
          return (
            <li
              className=""
              style={{ paddingLeft: "0px" }}
            >{`${replaceUnderScoreWithSpace(capitalizeFirstLetter(key))}: ${
              object[key]
            }`}</li>
          );
        })}
      </ul>
    );
  } else {
    return <>No Data</>;
  }
}

export {
  DisplayUnknownArrayObject,
  DisplayUnknownObjectWithNoKey,
  DisplayUnknownObject,
};
