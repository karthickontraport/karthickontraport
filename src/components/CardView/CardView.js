import React from "react";
import PropTypes from "prop-types";
import { VirtuosoGrid } from "react-virtuoso";
import styled from "@emotion/styled";
import style from "./CardView.module.css";

const CardView = ({ data = [], onCardClick }) => {
  const handleRowClick = (record, id) => {
    if (onCardClick) {
      onCardClick(record, id);
    }
  };
  const renderItem = (index, key) => {
    const item = data[index];

    return (
      <div
        key={key}
        className={style.card}
        onClick={() => handleRowClick(item, item.CustomerID)}
      >
        <div className={style.cardbox}>
          <div className={style.title}>Name</div>
          <div className={style.desc}>{item.Name || "----"}</div>
        </div>
        <div className={style.cardbox}>
          <div className={style.title}>Email</div>
          <div className={style.desc}>{item.EMail}</div>
        </div>
        <div className={style.cardbox}>
          <div className={style.title}>Phone</div>
          <div className={style.desc}>{item.Phone}</div>
        </div>
        <div className={style.cardbox}>
          <div className={style.title}>Company Name</div>
          <div className={style.desc}>{item.CompanyName}</div>
        </div>
        <div className={style.cardbox}>
          <div className={style.title}>AcctExec</div>
          <div className={style.desc}>{item.AcctExec || "-----"}</div>
        </div>
        <div className={style.cardbox}>
          <div className={style.title}>SignupDate</div>
          <div className={style.desc}>{item.SignupDate}</div>
        </div>
      </div>
    );
  };

  const ItemContainer = styled.div`
    display: flex;
    width: 18.125rem;
    padding: "20px";
    box-sizing: border-box;
  `;

  const ListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  `;

  return (
    <VirtuosoGrid
      components={{
        Item: ItemContainer,
        List: ListContainer,
        ScrollSeekPlaceholder: ({ height, width, index }) => (
          <>
            <div>loading</div>
          </>
        ),
      }}
      totalCount={data.length}
      itemContent={renderItem}
    />
  );
};

CardView.propTypes = {
  data: PropTypes.array,
};

export default CardView;
