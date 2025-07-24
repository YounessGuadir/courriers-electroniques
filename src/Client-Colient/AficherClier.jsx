import React, { useEffect, useState } from 'react';
import ColierApi from '../servicesApi/ColierApi';
import DestinataireApi from '../servicesApi/DestinataireApi';
import { Package, MapPin, Phone, User, Calendar, Trash2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AfficherColierElectronique() {
    const [colier, setColier] = useState([]);
    const [destinataire, setDestinataire] = useState([]);
    const [loadingColier, setLoadingColier] = useState(true);
    const [loadingDestinataire, setLoadingDestinataire] = useState(true);
    const [errorColier, setErrorColier] = useState(null);
    const [errorDestinataire, setErrorDestinataire] = useState(null);
    const [deletingIds, setDeletingIds] = useState(new Set());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const colierResponse = await ColierApi.all();
                setColier(colierResponse.data.coliers);
            } catch (error) {
                setErrorColier("Échec du chargement des courriers");
            } finally {
                setLoadingColier(false);
            }

            try {
                const destinataireResponse = await DestinataireApi.all();
                setDestinataire(destinataireResponse.data.destinataires);
            } catch (error) {
                setErrorDestinataire("Échec du chargement des destinataires");
            } finally {
                setLoadingDestinataire(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id, type) => {
        setDeletingIds(prev => new Set([...prev, id]));
        try {
            if (type === 'colier') {
                await ColierApi.delete(id);
                setColier(prev => prev.filter(item => item.id !== id));
                toast.success("Courrier supprimé avec succès");
            } else {
                await DestinataireApi.delete(id);
                setDestinataire(prev => prev.filter(item => item.id !== id));
                toast.success("Destinataire supprimé avec succès");
            }
        } catch (error) {
            toast.error(`Échec de la suppression: ${error.message}`);
        } finally {
            setDeletingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    if (loadingColier || loadingDestinataire) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Colier Section */}
            <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Package className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Courrier Électronique</h1>
                    </div>
                </div>
                
                {errorColier ? (
                    <div className="rounded-lg bg-destructive/10 p-6 text-destructive">
                        <p className="font-medium">{errorColier}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {colier.map((item) => (
                            <div 
                                key={item.id} 
                                className="group bg-card rounded-xl border shadow-sm transition-all duration-200 hover:shadow-lg"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <h2 className="font-semibold text-lg">{item.user?.name}</h2>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                            onClick={() => handleDelete(item.id, 'colier')}
                                            disabled={deletingIds.has(item.id)}
                                        >
                                            {deletingIds.has(item.id) ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-5 w-5" />
                                            )}
                                        </Button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="p-4 bg-muted/50 rounded-lg">
                                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                                <Package className="h-4 w-4" />
                                                <span className="font-medium text-foreground">{item.Object}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{item.titre}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Destinataire Section */}
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <User className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Destinataires</h1>
                    </div>
                </div>
                
                {errorDestinataire ? (
                    <div className="rounded-lg bg-destructive/10 p-6 text-destructive">
                        <p className="font-medium">{errorDestinataire}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destinataire.map((item) => (
                            <div 
                                key={item.id} 
                                className="group bg-card rounded-xl border shadow-sm transition-all duration-200 hover:shadow-lg"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <h2 className="font-semibold text-lg">
                                                {item.nom} {item.prenom}
                                            </h2>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                            onClick={() => handleDelete(item.id, 'destinataire')}
                                            disabled={deletingIds.has(item.id)}
                                        >
                                            {deletingIds.has(item.id) ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-5 w-5" />
                                            )}
                                        </Button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                <span className="text-sm">{item.adresse}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Phone className="h-4 w-4" />
                                                <span className="text-sm">{item.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}