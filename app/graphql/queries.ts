import gql from 'graphql-tag'

export const GET_LAUNCHES = gql`
  query GetLaunches {
    launches {
      mission_name
      launch_date_utc
      launch_site {
        site_name
      }
      rocket {
        rocket_name
      }
      details
    }
  }
`;
