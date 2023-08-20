import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Department {
  department: string;
  sub_departments: string[];
}

interface Props {
  data: Department[];
}

const ExpandableData: React.FC<Props> = ({ data }) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<
    Record<string, string[]>
  >({});
  const [expandedDepartment, setExpandedDepartment] = useState<string | null>(
    null
  );

  const toggleExpand = (department: string) => {
    if (expandedDepartment === department) {
      setExpandedDepartment(null);
    } else {
      setExpandedDepartment(department);
    }
  };

  const toggleDepartmentSelection = (department: string) => {
    if (selectedDepartments.includes(department)) {
      setSelectedDepartments(
        selectedDepartments.filter((dep) => dep !== department)
      );
      setSelectedSubDepartments((prevState) => ({
        ...prevState,
        [department]: [],
      }));
    } else {
      setSelectedDepartments([...selectedDepartments, department]);
      setSelectedSubDepartments((prevState) => ({
        ...prevState,
        [department]:
          data.find((dept) => dept.department === department)
            ?.sub_departments || [],
      }));
    }
  };

  const toggleSubDepartmentSelection = (
    department: string,
    subDept: string
  ) => {
    const updatedSelectedSubDepartments = {
      ...selectedSubDepartments,
      [department]: selectedSubDepartments[department]
        ? selectedSubDepartments[department].includes(subDept)
          ? selectedSubDepartments[department].filter(
              (dept) => dept !== subDept
            )
          : [...selectedSubDepartments[department], subDept]
        : [subDept],
    };

    const allSubDepartmentsSelected =
      data
        .find((dept) => dept.department === department)
        ?.sub_departments.every((subDept) =>
          updatedSelectedSubDepartments[department]?.includes(subDept)
        ) || false;

    setSelectedSubDepartments(updatedSelectedSubDepartments);

    if (allSubDepartmentsSelected) {
      setSelectedDepartments([
        ...new Set([...selectedDepartments, department]),
      ]);
    } else {
      setSelectedDepartments(
        selectedDepartments.filter((dep) => dep !== department)
      );
    }
  };

  const isDepartmentSelected = (department: string) =>
    selectedDepartments.includes(department);

  const isSubDepartmentSelected = (department: string, subDept: string) =>
    (selectedSubDepartments[department] || []).includes(subDept);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map((dept) => (
        <Accordion
          key={dept.department}
          expanded={expandedDepartment === dept.department}
          onChange={() => toggleExpand(dept.department)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.stopPropagation()
            }
            sx={{ borderBottom: "1px solid #e0e0e0" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDepartmentSelected(dept.department)}
                  onChange={(e) => {
                    toggleDepartmentSelection(dept.department);
                    e.stopPropagation();
                  }}
                />
              }
              label={
                <Typography variant="h6" color="textPrimary">
                  {dept.department}
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {dept.sub_departments.map((subDept, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={isSubDepartmentSelected(
                        dept.department,
                        subDept
                      )}
                      onChange={() =>
                        toggleSubDepartmentSelection(dept.department, subDept)
                      }
                    />
                  }
                  label={subDept}
                  sx={{ marginLeft: "16px" }}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ExpandableData;
