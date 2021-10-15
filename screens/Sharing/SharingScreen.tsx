import * as React from 'react';
import { Vibration } from 'react-native';
import HorizontalBar from '../../components/common/HorizontalBar';
import StandardButton from '../../components/common/StandardButton';
import ScrollContainer from '../../components/containers/ScrollContainer';
import ExportQRModal from './ExportQRModal';
import ImportQRModal from './ImportQRModal';

export default function SharingScreen()
{
    const [isExportQRVisible, setExportQRVisible] = React.useState(false);
    const [isImportQRVisible, setImportQRVisible] = React.useState(false);

    return (
        <ScrollContainer>
            
            {/* QR Codes */}
            <ExportQRModal isVisible={isExportQRVisible} setVisible={setExportQRVisible} />
            <StandardButton
                iconType={"qrcode"}
                title={"Show QRCode"}
                subtitle={"Export Scouting Data"} 
                onPress={() => { setExportQRVisible(true); }} />

            <ImportQRModal isVisible={isImportQRVisible} setVisible={setImportQRVisible} />
            <StandardButton
                iconType={"camera"}
                title={"Scan QRCode"}
                subtitle={"Import Scouting Data"} 
                onPress={() => { setImportQRVisible(true); }} />
            <HorizontalBar />

            {/* File Formats */}
            <StandardButton
                iconType={"table"}
                title={"Save to CSV"}
                subtitle={"Export Scouting Data"} 
                onPress={() => {}} />
            
            <StandardButton
                iconType={"file-zip-o"}
                title={"Save to ZIP"}
                subtitle={"Export Images"} 
                onPress={() => {}} />
            <HorizontalBar />

            {/* Cloud Save */}
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

            {/* Hardware Sync */}
            <StandardButton
                iconType={"usb"}
                title={"Sync from USB"}
                subtitle={"Import & Export Everything"} 
                onPress={() => {}} />
             <StandardButton
                iconType={"rss"}
                title={"Sync from NFC"}
                subtitle={"Import & Export Everything"} 
                onPress={() => { Vibration.vibrate([200, 200, 200, 200, 200, 600], false); }} />

        </ScrollContainer>
    );
}
