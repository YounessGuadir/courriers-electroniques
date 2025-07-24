
import { View, Text, StyleSheet } from '@react-pdf/renderer';



const DocumentFooter = ({ pageNumber, totalPages }) => {
  const styles = StyleSheet.create({
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: '#e2e8f0',
    },
    footerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 9,
      color: '#64748b',
    },
    pageNumber: {
      textAlign: 'center',
    },
    companyInfo: {
      textAlign: 'left',
    },
    documentInfo: {
      textAlign: 'right',
    }
  });

  return (
    <View style={styles.footer} fixed>
      <View style={styles.footerContent}>
        <Text style={styles.companyInfo}>ACME Corporation • contact@example.com</Text>
        <Text style={styles.pageNumber}>
          Page {pageNumber} sur {totalPages}
        </Text>
        <Text style={styles.documentInfo}>Document confidentiel</Text>
      </View>
    </View>
  );
};

export default DocumentFooter;