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
import { Container, Box } from "../common/Layout";
import HeaderDetails from "../header/HeaderDetails/HeaderDetails";
import PageHeader from "../header/PageHeader/PageHeader";
import { fetchData } from "../actions/contactListAction";
import Skeletons from "../common/Skeletons/Skeletons";
import LoadingSpin from "../common/Loading/Loading";
import style from "./common.module.css";

const CustomTable = lazy(() => import("../common/CustomTable/CustomTable"));
const CardView = lazy(() => import("../../components/CardView/CardView"));

const initialView = localStorage.getItem("currentView") || "table";

const ContactHomePage = ({ handleEdit }) => {
  const [currentView, setCurrentView] = useState(initialView);
  const dispatch = useDispatch();
  const { loading, error, success, data } = useSelector((state) => state.data);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("currentView", currentView);
  }, [currentView]);

  const handleViewChange = useCallback((view) => {
    setCurrentView(view);
  }, []);
  const onRowClick = (record, id) => {
    navigate(`editcontacts`);
    console.log("Row clicked:", record);
    console.log("Row ID:", id);
  };

  const memoizedColumns = useMemo(
    () => [
      { id: "Name", label: "Name", align: "left", dataIndex: "Name" },
      {
        id: "CompanyName",
        label: "CompanyName",
        align: "left",
        dataIndex: "CompanyName",
      },
      { id: "EMail", label: "EMail", align: "left", dataIndex: "EMail" },
      {
        id: "AcctExec",
        label: "AcctExec",
        align: "left",
        dataIndex: "AcctExec",
      },
      { id: "Phone", label: "Phone", align: "left", dataIndex: "Phone" },
      {
        id: "SignupDate",
        label: "SignupDate",
        align: "left",
        dataIndex: "SignupDate",
      },
    ],
    []
  );

  const transformedData = useMemo(() => {
    return data.map((item) => ({
      Name: item.Name,
      CompanyName: item.CompanyName,
      EMail: item.EMail,
      AcctExec: item.AcctExec,
      Phone: item.Phone,
      SignupDate: item.SignupDate,
    }));
  }, [data]);

  return (
    <Container className={style.Container}>
      <Box className={style.gap}>
        <HeaderDetails
          handleViewChange={handleViewChange}
          currentView={currentView}
        />
      </Box>
      <Box className={style.gap}>
        <PageHeader onClick={handleEdit} />
      </Box>
      <Box flexible scroll="vertical" className={style.bg}>
        {currentView === "table" && (
          <>
            {loading && <LoadingSpin />}
            {error && <p>Error: {error}</p>}
            {success && (
              <Suspense fallback={<p>Loading CustomTable...</p>}>
                <CustomTable
                  columns={memoizedColumns}
                  rowKey="id"
                  data={transformedData}
                  loading={loading}
                  onRowClick={onRowClick}
                />
              </Suspense>
            )}
          </>
        )}
        {currentView === "card" && (
          <>
            {loading && <LoadingSpin />}
            {error && <p>Error: {error}</p>}
            {success && (
              <Suspense fallback={<p>Loading CardView...</p>}>
                <div style={{ height: "100%", width: "100%" }}>
                  <CardView data={transformedData} onCardClick={onRowClick} />
                </div>
              </Suspense>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default ContactHomePage;
