import * as React from 'react';
import HorizontalBar from '../../components/common/HorizontalBar';
import StandardButton from '../../components/common/StandardButton';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import ExportQRModal from './ExportQRModal';
import ImportQRModal from './ImportQRModal';

export default function SharingScreen() {
    const [isExportQRVisible, setExportQRVisible] = React.useState(false);
    const [isImportQRVisible, setImportQRVisible] = React.useState(false);

    return (
        <ScrollContainer>

            <NavTitle>Sharing</NavTitle>

            {/* QR Codes */}
            <ExportQRModal isVisible={isExportQRVisible} setVisible={setExportQRVisible} />
            <StandardButton
                iconType={"qr-code"}
                title={"Show QRCode"}
                subtitle={"Export Scouting Data"}
                onPress={() => { setExportQRVisible(true); }} />

            <ImportQRModal isVisible={isImportQRVisible} setVisible={setImportQRVisible} />
            <StandardButton
                iconType={"camera-alt"}
                title={"Scan QRCode"}
                subtitle={"Import Scouting Data"}
                onPress={() => { setImportQRVisible(true); }} />
            <HorizontalBar />

            {/* File Formats */}
            <StandardButton
                iconType={"table-rows"}
                title={"Save to CSV"}
                subtitle={"Export Scouting Data"}
                onPress={() => { }} />

            <StandardButton
                iconType={"insert-drive-file"}
                title={"Save to ZIP"}
                subtitle={"Export Images"}
                onPress={() => { }} />
            <HorizontalBar />

            {/* Cloud Save */}
            {/*
            <StandardButton
                iconType={"cloud-upload"}
                title={"Upload to Cloud"}
                subtitle={"Export Everything"} 
                onPress={() => {}} />
            
            <StandardButton
                iconType={"cloud-download"}
                title={"Download from Cloud"}
                subtitle={"Import Everything"} 
                onPress={() => {}} />
            <HorizontalBar />
            */}

            {/* Hardware Sync */}
            <StandardButton
                iconType={"usb"}
                title={"Export to USB Drive"}
                subtitle={"Export Everything"}
                onPress={() => { }} />
            <StandardButton
                iconType={"usb"}
                title={"Import from USB Drive"}
                subtitle={"Import Everything"}
                onPress={() => { }} />

            <HorizontalBar />
            <StandardButton
                iconType={"nfc"}
                title={"Export to NFC"}
                subtitle={"Export Scouting Data"}
                onPress={() => { }} />
            <StandardButton
                iconType={"nfc"}
                title={"Import from NFC"}
                subtitle={"Import Scouting Data"}
                onPress={() => { }} />
            <HorizontalBar />

            <StandardButton
                iconType={"bluetooth"}
                title={"Export to Bluetooth"}
                subtitle={"Export Everything"}
                onPress={() => { }} />
            <StandardButton
                iconType={"bluetooth"}
                title={"Import from Bluetooth"}
                subtitle={"Import Everything"}
                onPress={() => { }} />

        </ScrollContainer>
    );
}
