import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/common/Button';
import ScrollContainer from '../../components/containers/ScrollContainer';
import Text from '../../components/common/Text';
import Title from '../../components/common/Title';
import ExportQRModal from './ExportQRModal';
import ImportQRModal from './ImportQRModal';

export default function SharingScreen() {
    const [isExportQRVisible, setExportQRVisible] = React.useState(false);
    const [isImportQRVisible, setImportQRVisible] = React.useState(false);

    return (
        <ScrollContainer>
            
            <Title>Sharing</Title>
            
            {/* Export QRCode */}
            <ExportQRModal isVisible={isExportQRVisible} setVisible={setExportQRVisible} />
            <Button style={styles.sharingButton} onPress={() => setExportQRVisible(true)}>
                <FontAwesome
                    size={40}
                    name={"qrcode"} 
                    style={styles.buttonIcon}/>
                <View>
                    <Text style={styles.buttonTitle}>Show QRCode</Text>
                    <Text style={styles.buttonSubtitle}>Export Comments</Text>
                </View>
            </Button>

            {/* Import QRCode */}
            <ImportQRModal isVisible={isImportQRVisible} setVisible={setImportQRVisible} />
            <Button style={styles.sharingButton}>
                <FontAwesome
                    size={30}
                    name={"camera"} 
                    style={styles.buttonIcon}/>
                <View>
                    <Text style={styles.buttonTitle}>Scan QRCode</Text>
                    <Text style={styles.buttonSubtitle}>Import Comments</Text>
                </View>
            </Button>

            {/* Export CSV */}
            <Button style={styles.sharingButton}>
                <FontAwesome
                    size={35}
                    name={"table"} 
                    style={styles.buttonIcon}/>
                <View>
                    <Text style={styles.buttonTitle}>Save to CSV</Text>
                    <Text style={styles.buttonSubtitle}>Export Teams &amp; Comments</Text>
                </View>
            </Button>

            {/* Export ZIP */}
            <Button style={styles.sharingButton}>
                <FontAwesome
                    size={35}
                    name={"file-zip-o"} 
                    style={styles.buttonIcon}/>
                <View>
                    <Text style={styles.buttonTitle}>Save to ZIP</Text>
                    <Text style={styles.buttonSubtitle}>Export Images</Text>
                </View>
            </Button>

            {/* Export Cloud */}
            <Button style={styles.sharingButton}>
                <FontAwesome
                    size={30}
                    name={"cloud-upload"} 
                    style={styles.buttonIcon}/>
                <View>
                    <Text style={styles.buttonTitle}>Upload to Cloud</Text>
                    <Text style={styles.buttonSubtitle}>Export Images, Teams, &amp; Comments</Text>
                </View>
            </Button>

            {/* Import Cloud */}
            <Button style={styles.sharingButton}>
                <FontAwesome
                    size={30}
                    name={"cloud-download"} 
                    style={styles.buttonIcon}/>
                <View>
                    <Text style={styles.buttonTitle}>Download from Cloud</Text>
                    <Text style={styles.buttonSubtitle}>Import Images, Teams, &amp; Comments</Text>
                </View>
            </Button>

        </ScrollContainer>
    );
}

const styles = StyleSheet.create({
    sharingButton: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    buttonIcon: {
        color: "#fff",
        marginRight: 10,
        width: 35
    },
    buttonTitle: {
        fontSize: 18,
        textAlign: "left"
    },
    buttonSubtitle: {
        color: "#bbb"
    }
});
