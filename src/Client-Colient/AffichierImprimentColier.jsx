// AfficherImprimentColier.jsx
import React, { useEffect, useState } from 'react';
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { Button } from "@/components/ui/button";
import ColierApi from '../servicesApi/ColierApi';
import { MailIcon, Download, Printer, Loader2 } from 'lucide-react';
import PDFDocument from './PDFDocument';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Composant PDF global
// const MyPdfDocument = ({ colliers }) => {
//   const styles = StyleSheet.create({
//     page: {
//       padding: 30,
//       fontFamily: 'Helvetica',
//       backgroundColor: 'white',
//       color: '#1f2937',
//     },
//     header: {
//       fontSize: 20,
//       marginBottom: 10,
//       textAlign: 'center',
//       color: '#2563eb',
//     },
//     section: {
//       marginBottom: 10,
//       fontSize: 12,
//       lineHeight: 1.5,
//     },
//     pageNumber: {
//       position: 'absolute',
//       bottom: 20,
//       left: 0,
//       right: 0,
//       textAlign: 'center',
//       fontSize: 10,
//       color: 'grey',
//     },
//   });

//   return (
//     <Document
//       title="Courriers Électroniques"
//       author="ACME Corp"
//       creator="Système de Gestion de Courrier"
//       producer="React PDF"
//       language="fr-FR"
//     >
//       {colliers.map((colier, index) => (
//         <Page key={index} style={styles.page}>
//           <Text style={styles.header}>Détails du collier</Text>

//           <Text style={styles.section}>
//             Utilisateur : {colier.user ? `${colier.user.name} (${colier.user.email})` : 'Non disponible'}
//           </Text>
//           <Text style={styles.section}>Nom du collier : {colier.titre}</Text>
//           <Text style={styles.section}>Objet : {colier.Object || 'Non spécifié'}</Text>
//           <Text style={styles.section}>Type : {colier.type_colier_electroniques || 'Non spécifié'}</Text>
//           <Text style={styles.section}>Date de création : {new Date(colier.created_at).toLocaleDateString()}</Text>

//           <Text
//             style={styles.pageNumber}
//             render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
//           />
//         </Page>
//       ))}
//     </Document>
//   );
// };

// Composant principal
export default function AfficherImprimentColier() {
  const [colliers, setColliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ColierApi.allImpriment()
      .then(({ data }) => {
        if (data.coliers && data.coliers.length > 0) {
          setColliers(data.coliers);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des colliers :", err);
        setLoading(false);
      });
  }, []);


   if (loading) {
    return (
      <div className="py-8 px-6 bg-gradient-to-b  min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="bg-blue-600">
              <h2 className="text-2xl font-semibold flex items-center">
                <MailIcon className="mr-2" size={22} />
                Chargement des données...
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              <Skeleton className="h-12 w-full mb-4" />
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-6 bg-gradient-to-b min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg shadow-lg overflow-hidden">
          <div className=" p-6 ">
            <h2 className="text-2xl font-semibold flex items-center">
              <MailIcon className="mr-2" size={22} />
              Gestion des Courriers Électroniques
            </h2>
            <p className=" mt-1">
              Vous pouvez télécharger ou imprimer vos courriers électroniques en format PDF
            </p>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-lg font-medium  mb-2">
                Résumé des Courriers
              </h3>
              <div className="p-4 rounded-md border  flex justify-between items-center">
                <div>
                  <p className="text-sm ">
                    Nombre total de courriers: <span className="font-semibold ">{colliers.length}</span>
                  </p>
                  <p className="text-sm mt-1">
                    Dernière mise à jour: {new Date().toLocaleString('fr-FR')}
                  </p>
                </div>

                <div className="flex gap-3">
                  <PDFDownloadLink
                    document={<PDFDocument colliers={colliers} />}
                    fileName="courriers-electroniques.pdf"
                    className="inline-flex"
                  >
                    {({ loading, error }) =>
                      loading ? (
                        <Button disabled>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Préparation...
                        </Button>
                      ) : error ? (
                        <Button disabled>
                          Erreur de génération
                        </Button>
                      ) : (
                        <Button>
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger PDF
                        </Button>
                      )
                    }
                  </PDFDownloadLink>

                  <Button variant="" onClick={() => window.print()}>
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimer
                  </Button>
                </div>
              </div>
            </div>

            {colliers.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium  mb-2">
                  Liste des Courriers ({colliers.length})
                </h3>

                {colliers.map((collier, index) => (
                  <div
                    key={collier.id || index}
                    className="border border-gray-200 rounded-md p-4  transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{collier.titre}</h4>
                        {collier.Object && (
                          <p className="text-sm  mt-1">
                            Objet: {collier.Object}
                          </p>
                        )}
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <span className={`px-2 py-1 rounded-full ${
                            collier.type_colier_electroniques === 'urgent' ? 'bg-red-100 text-red-800' :
                            collier.type_colier_electroniques === 'important' ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {collier.type_colier_electroniques || 'Standard'}
                          </span>
                          <span className="mx-2">•</span>
                          <span>
                            {new Date(collier.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>

                      <PDFDownloadLink
                        document={<PDFDocument colliers={[collier]} />}
                        fileName={`courrier-${collier.id || index}-${new Date(collier.created_at).toISOString().split('T')[0]}.pdf`}
                        className="inline-flex"
                      >
                        {({ loading }) =>
                          loading ? (
                            <Button variant="outline" size="sm" disabled>
                              <Loader2 className="w-3 h-3 animate-spin" />
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Download className="w-3 h-3" />
                            </Button>
                          )
                        }
                      </PDFDownloadLink>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <MailIcon className="h-12 w-12  mx-auto mb-4" />
                <h3 className="text-lg font-medium ">Aucun courrier disponible</h3>
                <p className="mt-1 ">Aucun courrier électronique n'a été trouvé dans le système.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
