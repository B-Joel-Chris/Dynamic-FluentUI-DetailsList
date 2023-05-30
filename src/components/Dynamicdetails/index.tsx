import * as React from "react";
import { useState, useEffect } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from "@fluentui/react/lib/DetailsList";
import ReactPaginate from "react-paginate";
import './listUi.css'
export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
  announcedMessage?: string;
}
export interface IDocument {
  key: string;
  name: string;
  value: string;
  iconName: string;
  fileType: string;
  modifiedBy: string;
  dateModified: string;
  dateModifiedValue: number;
  fileSize: string;
  fileSizeRaw: number;
}
const DetailsListDocumentsExample: any = (props: any) => {
  const [columnObj, setcolumnObj] = useState<any>([]);
  const [items, setItems] = useState<any>(props.rowdata);
  
  function _copyAndSort<T>(
    items: any,
    columnKey: string,
    isSortedAscending?: boolean
  ): any {
    console.log(items, columnKey, isSortedAscending);

    console.log(items, columnKey, isSortedAscending);
    const key = columnKey as keyof T;
    return items
      .slice(0)
      .sort((a: any, b: any) =>
        (isSortedAscending ? a[key] < b[key] : a[key] > b[key]) ? -1 : 1
      );
  }
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage + itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setCurrentPage(newOffset);
    console.log(currentItems);
    
  };
  const [selectionDetails, setSelectionDetails] = useState<string>("");
  const [isModalSelection, setIsModalSelection] = useState<boolean>(false);
  const [isCompactMode, setIsCompactMode] = useState<boolean>(false);
  const [announcedMessage, setAnnouncedMessage] = useState<string | undefined>(
    undefined
  );
  const sortTesting = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ) => {

    const cols = createList()
    console.log(columnObj);

    console.log(column);
    const newColumns: IColumn[] = cols;
    console.log(newColumns);
    const currentCol: IColumn = newColumns.filter(
      (corrItem) => column?.key === corrItem?.key
    )[0];
    console.log(currentCol);
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currentCol) {
        currentCol.isSortedDescending = !currentCol.isSortedDescending;
        currentCol.isSorted = true;
        setAnnouncedMessage(
          `${currentCol.name} is sorted ${
            currentCol.isSortedDescending ? "descending" : "ascending"
          }`
        );
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(
      items,
      currentCol.fieldName!,
      currentCol.isSortedDescending
    );

     setItems(newItems);
  };

  
  const renderList = () => {
    console.log(columnObj);
    console.log(currentItems);

    return (
      <>
        <DetailsList
          items={currentItems}
          compact={isCompactMode}
          columns={columnObj}
          selectionMode={SelectionMode.multiple}
          getKey={_getKey}
          setKey="multiple"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          selection={_selection}
          selectionPreservedOnEmptyClick={true}
          onItemInvoked={_onItemInvoked}
          enterModalSelectionOnTouch={true}
        />
        <div className="PagiationUI">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={totalPages}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
        </div>
      </>
    );
  };

  const createList = ():IColumn[] => {
    console.log(props.column);

    let colObj: any = [];
    props.column.map((x: any, i: any) => {
      console.log(x);
      console.log(`column${i + 1}`);
      console.log(i);

      colObj.push({
        key: `column${i + 1}`,
        name: x,
        ariaLabel:
          "Column operations for File type, Press to sort on File type",
        fieldName: `${x}`,
        minWidth: 100,
        maxWidth: 200,
        onColumnClick: sortTesting,
      });
    });
    console.log(colObj);
    setcolumnObj(colObj);
    return colObj
  };

  function _getKey(item: any, index?: number): string {
    return item.key;
  }
  function _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  function _getSelectionDetails(): string {
    const selectionCount = _selection.getSelectedCount();
    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return (
          "1 item selected: " + (_selection.getSelection()[0] as IDocument).name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }

  const _selection = new Selection({
    onSelectionChanged: () => {
      setSelectionDetails(_getSelectionDetails);
    },
  });

  useEffect(() => {
    createList();
  }, []);


  return (
    <>
      <div>{renderList()}</div>
    </>
  );
};
export default DetailsListDocumentsExample;
