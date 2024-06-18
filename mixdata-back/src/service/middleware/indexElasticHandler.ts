import { HttpStatus } from "../../data/constants/httpStatus";

const createIndex = (index) => {
    try {
        // await  elasticRepository.createIndex(indexName: string, mappings: object) {
        //     const res = await this.elasticClient.indices.create({
        //         index: indexName,
        //         operations: {
        //           ...mappings
        //         }
        //       }, { ignore: [400] });
        //       // await this.refresh(indexName);
        //       return res;
        //   }
  
      return index;
    } catch (error) {
      return null;
    }
  };

export const responseFormatter = (err, req, res, next) => {
    if (err) {
        const { statusCode } = err;
        res
          .status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: createIndex(err), isError: true, data: null });
      } else {
        next();
      }
  };