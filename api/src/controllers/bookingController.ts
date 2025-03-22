import VrboService from '../../../__services/vrbo'

/**
 * Create a Booking.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const create = async (req: Request, res: Response) => {
  try {
    const { body }: { body: movininTypes.Booking } = req
    const booking = new Booking(body)

    await booking.save()

    // Sync with VRBO if enabled
    if (env.VRBO_ENABLED) {
      try {
        const vrboService = new VrboService(env.VRBO_API_KEY)
        await vrboService.syncCalendar(booking.property.toString(), [booking])
        logger.info(`[booking.create] Synced booking ${booking._id} with VRBO`)
      } catch (vrboErr) {
        logger.error(`[booking.create] Error syncing with VRBO: ${vrboErr}`)
        // Don't fail the booking creation if VRBO sync fails
      }
    }

    return res.json(booking)
  } catch (err) {
    logger.error(`[booking.create] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
} 