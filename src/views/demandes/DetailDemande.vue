<template>

  <div :style="{
    padding: '24px',
    margin: '24px',
    background: '#fff',
  
  
  
  }" style="border: 1px solid rgb(235, 237, 240)">
    <a-page-header title="Gestion des demandes" sub-title="Détails sur demande" @back="() => $router.go(-1)">
      <template #extra>
        <a-button key="3" @click="rejetteDemande()">Rejeter la demande</a-button>
        <a-button key="2" @click="mettreEnAttente()">Mettre en attente</a-button>
        <a-button key="1" type="primary" @click="valideDemande()">Valider la demande</a-button>
      </template>
      <template #footer>
        <a-tabs>
          <a-tab-pane key="1" tab="Details">
            <br>
            <a-descriptions title="Info Demande" bordered>
              <a-descriptions-item label="Model" :span="3">{{ demande.model }}</a-descriptions-item>
              <a-descriptions-item label="Marque" :span="3">{{ demande.marque }}</a-descriptions-item>
              <a-descriptions-item label="Nombre de place" :span="3">{{ demande.nbPlace }}</a-descriptions-item>
              <a-descriptions-item label="Type de transport" :span="3">{{ typeTrans.libelleTypeTransport }}
              </a-descriptions-item>
              <a-descriptions-item label="Zone" :span="3">{{ zone.libelle }}</a-descriptions-item>
              <a-descriptions-item label="Status" :span="3" v-if="demande.etat == 2">
                <a-badge status="orange" text="En cour de traitemant" />
              </a-descriptions-item>
              <a-descriptions-item label="Status" :span="3" v-if="(demande.etat == 3)">
                <a-badge status="red" text="Rejétée" />
              </a-descriptions-item>
              <a-descriptions-item label="Status" :span="3" v-if="(demande.etat == 4)">
                <a-badge status="green" text="Valide" />
              </a-descriptions-item>
              <a-descriptions-item label="Status" :span="3" v-if="(demande.etat == 1)">
                <a-badge status="green" text="Non traitée" />
              </a-descriptions-item>
              <a-descriptions-item label="immatriculation" :span="3">{{ demande.immatriculation }}</a-descriptions-item>

              <a-descriptions-item label="Détails du véhicule">
                Couleur Jaune
                <br />
                Année: 2019
                <br />
                N° carte grise: 123456789
                <br />
                N° chassis: 123456789
                <br />
                N° de serie: 123456789
                <br />
                N° de plaque: 123456789
                <br />
              </a-descriptions-item>
            </a-descriptions>

          </a-tab-pane>
          <a-tab-pane key="2" tab="Documents" />
        </a-tabs>
      </template>
      <div class="content">
        <div class="main">
          <a-descriptions size="small" :column="2">
            <a-descriptions-item label="Demande de">{{ proprios.prenom }} {{ proprios.nom }}</a-descriptions-item>
            <a-descriptions-item label="telephone">
              {{ proprios.telephone }}
            </a-descriptions-item>
            <a-descriptions-item label="Date de demande">{{ demande.date }}</a-descriptions-item>
            <a-descriptions-item label="Date de naissance">{{ proprios.dateNaissance }}</a-descriptions-item>
            <a-descriptions-item label="email">
              {{ proprios.email }}
            </a-descriptions-item>
            <a-descriptions-item label="permis">
              {{ proprios.permis }}
            </a-descriptions-item>
            <a-descriptions-item label="Lieu de naissance">
              {{ proprios.lieuNaissance }}
            </a-descriptions-item>
            <a-descriptions-item label="Lieu de residence">
              {{ proprios.lieuResidence }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <br>
        <br>

      </div>

      <a-button type="primary" @click="onDelete()" danger key="3">Suprimer la demande</a-button>

    </a-page-header>
  </div>
</template>

<script>

import axios from 'axios';

export default {

  data() {
    return {
      demande: {},
      proprios: {},
      typeTrans: {},
      zone: {},
    }
  },

  methods: {
    onDelete() {
      axios.delete(`http://192.168.252.206:4000/api/demandes/deleteDemande/${this.$route.params.id}`)
        .then(() => {
          this.$message.success('Suppression effectuée avec succès');
          this.$router.push('/tableau-de-bord/liste-demandes');
        })
        .catch(() => {
          this.$message.error('Erreur lors de la suppression');
        });
    },
    valideDemande() {
      axios.put(`http://192.168.252.206:4000/api/demandes/updateDemande/${this.$route.params.id}`,
        {
          etat: 4,
          // statut: true
        })
        .then(() => {
          this.$message.success('Validation effectuée avec succès');
          this.$router.push('/tableau-de-bord/liste-demandes');
        })
        .catch(() => {
          this.$message.error('Erreur lors de la validation');
        });
    },
    mettreEnAttente() {
      axios.put(`http://192.168.252.206:4000/api/demandes/updateDemande/${this.$route.params.id}`,
        {
          etat: 2,
          // statut: true
        })
        .then(() => {
          this.$message.success('mise en attende effectuée avec succès');
          this.$router.push('/tableau-de-bord/liste-demandes');
        })
        .catch(() => {
          this.$message.error('Erreur lors de la validation');
        });
    },
    rejetteDemande() {
      axios.put(`http://192.168.252.206:4000/api/demandes/updateDemande/${this.$route.params.id}`,
        {
          etat: 3,
          // statut: true
        })
        .then(() => {
          this.$message.success('Réjet effectuée avec succès');
          this.$router.push('/tableau-de-bord/liste-demandes');
        })
        .catch(() => {
          this.$message.error('Erreur lors de la validation');
        });
    }
  },
  async mounted() {
    let dataSource = await axios.get(`http://192.168.252.206:4000/api/demandes/${this.$route.params.id}`);
    this.demande = dataSource.data.data;
    this.proprios = this.demande.idProprietaireFk
    this.typeTrans = this.demande.idTypeTransportFk
    this.zone = this.demande.idZoneFk

  }




};
</script>

<style>
.components-page-header-demo-responsive {
  padding-bottom: 20px;
}

.components-page-header-demo-responsive tr:last-child td {
  padding-bottom: 0;
}

#components-page-header-demo-responsive .content {
  display: flex;
}

#components-page-header-demo-responsive .ant-statistic-content {
  font-size: 20px;
  line-height: 28px;
}

@media (max-width: 576px) {
  #components-page-header-demo-responsive .content {
    display: block;
  }

  #components-page-header-demo-responsive .main {
    width: 100%;
    margin-bottom: 12px;
  }

  #components-page-header-demo-responsive .extra {
    width: 100%;
    margin-left: 0;
    text-align: left;
  }
}
</style>