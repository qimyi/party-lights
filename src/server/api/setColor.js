import parseJsonRequest from '../parseJsonRequest';
import sendResponse from '../sendResponse';
import lights from '../lights';

export const url = '/api/v1/setColor';
export const method = 'POST';
export const handler = async (req, res) => {
  try {
    const json = await parseJsonRequest(req);
    console.log('New color should be: ' + json.color);
    lights.setColor(json.color);
    sendResponse(res, {success: true});
  } catch (error) {
    sendResponse(res, {error: error.message}, 400)
  }
};
