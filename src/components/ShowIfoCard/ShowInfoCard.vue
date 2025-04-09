<template>
  <div class="show-card">
    <div class="show-card__info">
      <h2>{{ name }}</h2>
      <ul class="show-card__details">
        <li v-if="network">
          <strong>Network:</strong> {{ network.name }} - {{ network.country.name }}
        </li>
        <li>
          <strong>Schedule:</strong>
          <span v-for="(day, index) in schedule.days" :key="index">
            {{ day }} <span v-if="schedule.days.length > 1">|</span>
          </span>
        </li>
        <li v-if="runtime"><strong>Runtime:</strong>{{ runtime }} / min</li>
        <li v-if="status"><strong>Status:</strong> {{ status }}</li>
        <li v-if="network"><strong>Show Type:</strong> {{ type }}</li>
        <li v-if="genres"><strong>Genres:</strong> {{ genres[0] }}</li>
        <li v-if="officialSite">
          <a :href="officialSite" :alt="name" target="_blank">Official Site</a>
        </li>
        <li v-if="weight" class="show-card__progress">
          <div class="show-card__progress--value">{{ weight }}</div>
          <div class="show-card__progress--total">/ 100</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
    default: 'N/A',
  },
  network: {
    type: Object,
    required: true,
    default: () => ({ name: 'N/A', country: { name: 'N/A' } }),
  },
  schedule: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  runtime: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    required: true,
    default: 'N/A',
  },
  type: {
    type: String,
    required: true,
    default: 'N/A',
  },
  genres: {
    type: Array,
    required: true,
    default: () => ['N/A'],
  },
  officialSite: {
    type: [String, null],
    required: true,
    default: 'N/A',
  },
  weight: {
    type: Number,
    required: true,
    default: 0,
  },
  schedule: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})
</script>

<style scoped lang="scss">
.show-card {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: auto;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &__info {
    width: 100%;
  }

  &__details {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0 0;

    li {
      margin-bottom: 0.75rem;
      font-size: 1rem;
      color: #333;

      strong {
        color: #222;
        margin-right: 5px;
      }

      a {
        color: #007bff;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  &__progress {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    font-weight: bold;

    &--value {
      font-size: 1.2rem;
      background: #4caf50;
      color: #fff;
      padding: 0.4rem 0.7rem;
      border-radius: 6px 0 0 6px;
    }

    &--total {
      background: #e0e0e0;
      padding: 0.4rem 0.7rem;
      border-radius: 0 6px 6px 0;
      color: #555;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 1rem;
  }
}
</style>
