import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';



const DocumentHeader = ({ title, date }) => {
  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: '#1d4ed8',
      paddingBottom: 10,
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerLogoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoPlaceholder: {
      width: 40,
      height: 40,
      backgroundColor: '#bfdbfe',
      borderRadius: 20,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1e40af',
    },
    headerRight: {
      alignItems: 'flex-end',
    },
    dateText: {
      fontSize: 10,
      color: '#6b7280',
    },
    companyName: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1e40af',
    }
  });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLogoContainer}>
        <View style={styles.logoPlaceholder} />
        <Text style={styles.companyName}>ACME Corp</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.headerTitle}>{title}</Text>
        {date && <Text style={styles.dateText}>Généré le {date}</Text>}
      </View>
    </View>
  );
};

export default DocumentHeader;