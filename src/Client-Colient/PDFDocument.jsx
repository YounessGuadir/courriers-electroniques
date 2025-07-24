
import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  StyleSheet, 
  View, 
  Image 
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: 'white',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#1d4ed8',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 30,
  },
  headerLogo: {
    width: 120,
    height: 50,
    marginRight: 20,
  },
  headerTitle: {
    color: '#1d4ed8',
    fontFamily: 'Helvetica-Bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    color: '#64748b',
    fontSize: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 20,
    color: '#1e40af',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    color: '#1e40af',
  },
  fieldContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  fieldLabel: {
    width: '30%',
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: '#334155',
  },
  fieldValue: {
    width: '70%',
    fontSize: 11,
    color: '#0f172a',
  },
  typeTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 10,
    alignSelf: 'flex-start',
    fontFamily: 'Helvetica-Bold',
  },
  urgent: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
  },
  important: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  standard: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
    borderTopStyle: 'solid',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#64748b',
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    fontSize: 10,
    textAlign: 'center',
    color: '#94a3b8',
  },
  watermark: {
    position: 'absolute',
    top: '40%',
    left: '15%',
    opacity: 0.05,
    transform: 'rotate(-45deg)',
    fontSize: 60,
    color: '#1e40af',
  },
});

// Create PDF Document
const PDFDocument = ({ colliers }) => (
  <Document
    title="Courriers Électroniques - Barid Maroc"
    author="Barid Maroc"
    creator="Système de Gestion de Courrier"
    producer="Barid Maroc"
    language="fr-FR"
  >
    {colliers.map((colier, index) => (
      <Page key={index} size="A4" style={styles.page}>
        {/* Logo and Header */}
        <View style={styles.header}>
          {/* You may need to replace this with a proper logo URL or base64 encoded image */}
          <View>
            <Text style={styles.headerTitle}>Barid Maroc</Text>
            <Text style={styles.headerSubtitle}>Service de Courriers Électroniques</Text>
          </View>
        </View>

        {/* Watermark */}
        <Text style={styles.watermark}>BARID MAROC</Text>

        {/* Title */}
        <Text style={styles.title}>Courriers Électronique</Text>

        {/* Main Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Générales</Text>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Référence:</Text>
            <Text style={styles.fieldValue}>{colier.id || "N/A"}</Text>
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Titre:</Text>
            <Text style={styles.fieldValue}>{colier.titre || "N/A"}</Text>
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Objet:</Text>
            <Text style={styles.fieldValue}>{colier.Object || "Non spécifié"}</Text>
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Type:</Text>
            <View style={[
              styles.typeTag,
              colier.type_colier_electroniques === 'urgent' ? styles.urgent :
              colier.type_colier_electroniques === 'important' ? styles.important :
              styles.standard
            ]}>
              <Text>{colier.type_colier_electroniques || 'Standard'}</Text>
            </View>
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Date de création:</Text>
            <Text style={styles.fieldValue}>
              {new Date(colier.created_at).toLocaleDateString('fr-FR')}
            </Text>
          </View>
        </View>

        {/* User Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de l'Utilisateur</Text>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nom:</Text>
            <Text style={styles.fieldValue}>
              {colier.user ? colier.user.name : 'Non disponible'}
            </Text>
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email:</Text>
            <Text style={styles.fieldValue}>
              {colier.user ? colier.user.email : 'Non disponible'}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Ce document est généré automatiquement par le système de gestion des courriers électroniques de Barid Maroc.
            Pour toute question, veuillez contacter le service client au +212 XXXXXXXXX.
          </Text>
        </View>

        {/* Page Number */}
        <Text 
          style={styles.pageNumber} 
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} sur ${totalPages}`}
        />
      </Page>
    ))}
  </Document>
);

export default PDFDocument;