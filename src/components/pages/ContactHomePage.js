import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
import { Container, Box } from "../common/Layout";
import HeaderDetails from "../header/HeaderDetails/HeaderDetails";
import PageHeader from "../header/PageHeader/PageHeader";
import { fetchData } from "../actions/contactListAction";
import { Result } from "antd";
import LoadingSpin from "../common/Loading/Loading";
import Skeleton from "@mui/material/Skeleton";
import style from "./common.module.css";

const CustomTable = lazy(() => import("../common/CustomTable/CustomTable"));
const CardView = lazy(() => import("../../components/CardView/CardView"));

const initialView = localStorage.getItem("currentView") || "table";

const ContactHomePage = ({ handleEdit }) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [filters, setFilters] = useState({});
  const [dataCount, setDataCount] = useState("");
  const dispatch = useDispatch();
  const { loading, error, success, data } = useSelector((state) => state.data);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data]);

  useEffect(() => {
    localStorage.setItem("currentView", currentView);
  }, [currentView]);

  const handleViewChange = useCallback((view) => {
    setCurrentView(view);
  }, []);

  const onRowClick = (record) => {
    const { CustomerID } = record;
    localStorage.setItem("currentCustomerID", CustomerID);
    navigate(`contactDetailes/${CustomerID}`);
  };

  const handleAddForm = () => {
    navigate("addContacts");
  };

  const memoizedColumns = useMemo(
    () => [
      { id: "Name", label: "Name", align: "left", dataIndex: "Name" },
      {
        id: "CompanyName",
        label: "Company Name",
        align: "left",
        dataIndex: "CompanyName",
      },
      { id: "EMail", label: "EMail", align: "left", dataIndex: "EMail" },
      {
        id: "AcctExec",
        label: "Account Executive",
        align: "left",
        dataIndex: "AcctExec",
      },
      { id: "Phone", label: "Phone", align: "left", dataIndex: "Phone" },
      {
        id: "SignupDate",
        label: "Signup Date",
        align: "left",
        dataIndex: "SignupDate",
      },
    ],
    []
  );

  const capitalizeFirstLetter = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const transformedData = useMemo(() => {
    const sortedData = data
      .map((item) => ({
        Name: capitalizeFirstLetter(item.Name) || "-----",
        CompanyName: capitalizeFirstLetter(item.CompanyName) || "-----",
        EMail: item.EMail ? item.EMail.toLowerCase() : "-----",
        AcctExec: item.AcctExec.trim()
          ? capitalizeFirstLetter(item.AcctExec)
          : "House Rep",
        Phone: item.Phone || "-----",
        SignupDate: item.SignupDate
          ? new Date(item.SignupDate).toLocaleDateString()
          : "-----",
        CustomerID: item.CustomerID || "-----",
      }))
      .sort((a, b) => {
        const yearDiff =
          new Date(b.SignupDate).getFullYear() -
          new Date(a.SignupDate).getFullYear();
        if (yearDiff !== 0) {
          return yearDiff;
        }
        return new Date(b.SignupDate) - new Date(a.SignupDate);
      });

    return sortedData;
  }, [data]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = useMemo(() => {
    return transformedData.filter((item) => {
      return Object.keys(filters).every((filterKey) => {
        const filterValue = filters[filterKey];
        return (
          !filterValue ||
          Object.values(item).some((itemValue) =>
            String(itemValue).toLowerCase().includes(filterValue.toLowerCase())
          )
        );
      });
    });
  }, [transformedData, filters]);

  useEffect(() => {
    const hasFilters = Object.values(filters).some(Boolean);

    if (hasFilters) {
      setDataCount(filteredData.length);
    } else {
      setDataCount(transformedData.length);
    }
  }, [filteredData, transformedData, filters]);

  const subtitleStyle = {
    fontSize: "18px",
  };

  return (
    <Container className={style.Container}>
      <Box className={style.gap}>
        <HeaderDetails
          handleViewChange={handleViewChange}
          currentView={currentView}
        />
      </Box>
      <Box className={style.gap}>
        <PageHeader
          onClick={handleAddForm}
          onChange={handleFilterChange}
          count={dataCount}
        />
      </Box>
      <Box flexible scroll="vertical" className={style.bg}>
        {currentView === "table" && (
          <>
            {loading && (
              <Container align="both">
                <LoadingSpin />
              </Container>
            )}
            {error && (
              <Container align="both" className={style.emptyContainer}>
                <Result
                  status="500"
                  title="500"
                  subTitle={<span style={subtitleStyle}>{error}</span>}
                />
              </Container>
            )}
            {success && (
              <Suspense fallback={<Skeleton />}>
                <CustomTable
                  columns={memoizedColumns}
                  data={filteredData}
                  loading={loading}
                  onRowClick={onRowClick}
                />
              </Suspense>
            )}
          </>
        )}
        {currentView === "card" && (
          <>
            {loading && (
              <Container align="both">
                <LoadingSpin />
              </Container>
            )}
            {error && (
              <Container align="both" className={style.emptyContainer}>
                <Result
                  status="500"
                  title="500"
                  subTitle={<span style={subtitleStyle}>{error}</span>}
                />
              </Container>
            )}
            {success && (
              <Suspense fallback={<p>Loading CardView...</p>}>
                {filteredData.length === 0 ? (
                  <Container align="both" className={style.searchContainer}>
                    <Empty
                      description={
                        <span className={style.discription}>
                          No search results found.
                        </span>
                      }
                    />
                  </Container>
                ) : (
                  <div style={{ height: "100%", width: "100%" }}>
                    <CardView data={filteredData} onCardClick={onRowClick} />
                  </div>
                )}
              </Suspense>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default ContactHomePage;
