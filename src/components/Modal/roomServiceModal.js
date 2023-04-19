import {
    CButton,
    CFormInput,
    CFormLabel,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
  } from "@coreui/react";
  import React from "react";
  import PropTypes from "prop-types";
  
  const RoomServiceModal = ({
    block,
    setBlock,
    checkInId,
    itemName,
    setItemName,
    roomName,
    setRoomName,
    itemPrice,
    setItemPrice,
    addRoomService,
  }) => {
  
    return (
      <>
        <CModal size="lg" visible={block} onClose={() => setBlock(false)}>
          <CModalHeader onClose={() => setBlock(false)}>
            <CModalTitle>Room Service</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormLabel className="semi-bold" htmlFor="item-name">
              Item Name:
            </CFormLabel>
            <CFormInput
                id="item-name"
                type="text"
                placeholder="Enter item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onWheel={(e) => e.target.blur()}
                aria-label="Amount (to the nearest dollar)"
              />
            <CFormLabel className="semi-bold" htmlFor="price">
              price:
            </CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText>৳</CInputGroupText>
              <CFormInput
                id="price"
                type="number"
                placeholder="Enter Advance amount"
                value={parseFloat(itemPrice)}
                onChange={(e) =>
                  setItemPrice(parseFloat(e.target.value))
                }
                onWheel={(e) => e.target.blur()}
                aria-label="Amount (to the nearest dollar)"
              />
            </CInputGroup>
            <CFormLabel className="semi-bold" htmlFor="room">
              Room Name:
            </CFormLabel>
            <CFormInput
                id="room"
                type="text"
                placeholder="Enter Room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                onWheel={(e) => e.target.blur()}
                aria-label="Amount (to the nearest dollar)"
              />
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                setItemName('');
                setRoomName('');
                setItemPrice(0);
                setBlock(false);
              }}
            >
              Close
            </CButton>
            <CButton onClick={() => addRoomService(checkInId)} color="primary">
              Submit
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  };
  
  RoomServiceModal.propTypes = {
    block: PropTypes.bool.isRequired,
    setBlock: PropTypes.func.isRequired,
    itemName: PropTypes.string.isRequired,
    setItemName: PropTypes.func.isRequired,
    roomName: PropTypes.string.isRequired,
    setRoomName: PropTypes.func.isRequired,
    itemPrice: PropTypes.number.isRequired,
    setItemPrice: PropTypes.func.isRequired,
    checkInId: PropTypes.string.isRequired,
    addRoomService: PropTypes.func.isRequired,
  };
  
  export default RoomServiceModal;
