import React, { useEffect, useState } from 'react';
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { Button } from "@/components/ui/button";
import { useUserContext } from '../../Context/UserContext';
import ColierApi from '../../servicesApi/ColierApi';

// Composant PDF avec un seul collier
const MyPdfDocument = ({ user, colier }) => {
  const styles = StyleSheet.create({
    body: {
      padding: 20,
      fontFamily: 'Helvetica',
    },
    header: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    section: {
      fontSize: 12,
      marginBottom: 10,
      lineHeight: 1.5,
    },
    pageNumber: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 12,
      color: 'grey',
    },
  });

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          Détails du collier pour {user?.name || 'Utilisateur inconnu'}
        </Text>
        <Text style={styles.section}>
          Utilisateur : {user?.name || 'Nom inconnu'} {user?.email || 'Email inconnu'}
        </Text>

        {colier ? (
          <>
            <Text style={styles.section}>Nom du collier : {colier.titre}</Text>
            <Text style={styles.section}>Objet : {colier?.Object || 'Non spécifié'}</Text>
            <Text style={styles.section}>Type de collier électronique : {colier?.type_colier_electroniques || 'Non spécifié'}</Text>
          </>
        ) : (
          <Text style={styles.section}>Aucun collier disponible.</Text>
        )}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </Page>
    </Document>
  );
};

// Composant principal
export default function PagePdf() {
  const { user } = useUserContext();
  const [collier, setCollier] = useState(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ColierApi.all().then(({ data }) => {
      if (data.coliers && data.coliers.length > 0) {
        setCollier(data.coliers[0]); // Sélection du premier collier
      }
      setLoading(false);
    }).catch((error) => {
      console.error("Erreur lors de la récupération des colliers :", error);
      setLoading(false);
    });
  }, []);

  if (loading || !user) return <div>Chargement de l'utilisateur...</div>;

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">Télécharger votre PDF</h2>
      <PDFDownloadLink
        document={<MyPdfDocument user={user} colier={collier} />}
        fileName="collier-utilisateur.pdf"
      >
        {({ loading }) =>
          loading ? 'Génération du document...' : <Button>Télécharger le PDF</Button>
        }
      </PDFDownloadLink>
    </div>
  );
}
