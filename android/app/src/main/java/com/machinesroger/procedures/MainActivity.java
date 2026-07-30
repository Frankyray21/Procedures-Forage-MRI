package com.machinesroger.procedures;

import android.os.Bundle;
import android.webkit.WebView;

import androidx.activity.OnBackPressedCallback;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Bouton RETOUR d'Android, géré au niveau NATIF (le branchement JS via
        // le plugin App s'est montré non fiable selon les appareils) :
        // - l'historique du WebView n'est pas vide -> page précédente
        //   (la navigation de l'app est par hash : chaque fiche/onglet est une
        //   entrée d'historique) ;
        // - à la racine -> l'app passe en veilleuse (écran des récents) au lieu
        //   de se fermer, pour rouvrir instantanément.
        // Enregistré APRÈS super.onCreate() : dernier inscrit, ce callback
        // prime sur la gestion par défaut de Capacitor.
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                WebView webView = getBridge() != null ? getBridge().getWebView() : null;
                if (webView != null && webView.canGoBack()) {
                    webView.goBack();
                } else {
                    moveTaskToBack(true);
                }
            }
        });
    }
}
