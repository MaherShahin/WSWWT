import express from 'express';
import { RoomController } from '../../controllers/roomController';
import authMiddleware from '../../middleware/authMiddleware';
import { validateCreateRoom } from '../../middleware/validation/roomValidation';

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('test');
    }
);

router.use(authMiddleware);

router.get('/:id', RoomController.getRoomById);
router.post('/create', validateCreateRoom, RoomController.createRoom);
router.post('/join/:roomId', RoomController.joinRoom);
router.post('/leave/:roomId', RoomController.leaveRoom);
router.delete('/delete/:roomId', RoomController.deleteRoom);
router.put('/update/:roomId', RoomController.updateRoom);

// router.post('/:roomId/addSeries', RoomController.addSeriesToRoom);
// router.post('/:roomId/removeSeries', RoomController.removeSeriesFromRoom);

export default router;